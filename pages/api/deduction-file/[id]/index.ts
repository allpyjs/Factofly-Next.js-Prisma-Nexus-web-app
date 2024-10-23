import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';

import { withSentry } from '@sentry/nextjs';
import { RecordType } from '@prisma/client';
import prisma from '~/server/utils/prismaClient';
import createFileAttachment from '~/server/files/createFileAttachment';
import getFileFromRequest from '~/server/files/getFileFromRequest';
import logger from '~/utils/logger';
import { roles } from '~/server/graphql/schema/types';
import mailClient from '~/server/utils/mailClient';
import apiConfig from '~/apiConfig';

export const config = {
  api: {
    bodyParser: false
  }
};

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const { id } = req.query;

  if (!session || session?.user === null) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  const deduction = await prisma.deduction.findUnique({
    where: { id: BigInt(id as string) }
  });

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });

  if (!user || (user.id !== deduction?.userId && user.role !== roles.ADMIN)) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  if (!deduction) {
    res.status(404).send({ error: 'record not found' });
    return;
  }

  try {
    const file = await getFileFromRequest(req);
    if (!file) {
      res.status(400).send({ error: 'no file found in form' });
      return;
    }

    if (!allowedMimeTypes.includes(file.mimeType)) {
      const errorMessage = `invalid mime type uploaded: ${file.mimeType}`;
      logger.error(errorMessage);
      res.status(400).send(errorMessage);
      return;
    }

    await createFileAttachment({
      name: 'image',
      recordType: 'Deduction',
      recordId: Number(id),
      filePath: file.filePath,
      mimeType: file.mimeType,
      size: file.size,
      originalFileName: file.originalFileName
    });

    // send file to economic
    await mailClient.sendMail({
      from: `Bilag ${id} - Bruger ${user.id} - ${user.firstName} ${user.lastName} <${apiConfig.supportEmail}>`,
      to: apiConfig.economic.deductionEmail,
      subject: deduction.description!,
      text: '',
      attachments: [
        {
          filename: file.originalFileName,
          path: file.filePath
        }
      ]
    });

    await prisma.audit.create({
      data: {
        event: 'file-uploaded',
        recordId: Number(id),
        user: { connect: { id: user.id } },
        recordType: RecordType.DEDUCTION,
        value: {
          filePath: file.filePath,
          mimeType: file.mimeType,
          size: file.size,
          originalFileName: file.originalFileName
        }
      }
    });

    res.status(200).json({});
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: 'internal server error' });
  }
});

export default withSentry(apiRoute);
