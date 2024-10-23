import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import prisma from '~/server/utils/prismaClient';
import streamFileFromS3 from '~/server/files/streamFileFromS3';
import logger from '~/utils/logger';
import { roles } from '~/server/graphql/schema/users/RoleEnum';

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const { id } = req.query;

  const start = new Date().getTime();

  if (!session || session?.user === null) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  try {
    const salary = await prisma.salary.findUnique({
      where: { id: BigInt(id as string) }
    });
    const user = await prisma.user.findFirst({ where: { email: session.user.email } });

    if (!user || (user.id !== salary?.userId && user.role !== roles.ADMIN)) {
      res.status(403).send({ error: 'unauthorised' });
      return;
    }

    const blob = await prisma.attachmentBlob.findFirst({
      where: {
        attachment: { some: { recordType: 'Salary', name: 'fee-invoice', recordId: Number(id!) } }
      },
      orderBy: { createdDate: 'desc' }
    });

    if (!blob) {
      res.status(404).send({ error: 'file not found' });
      return;
    }

    await streamFileFromS3({
      res,
      key: blob.key,
      contentType: blob.contentType!,
      bucket: blob.bucketName ?? undefined
    });

    const end = new Date().getTime();
    const duration = end - start;
    logger.info(`${req.url}: streamed salary file from aws in ${duration}ms`);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: 'internal server error' });
  }
});

export default withSentry(apiRoute);
