import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import generateTaskContract from '~/server/pdf/task-contract/generateTaskContract';
import sendPdfResult from '~/server/pdf/sendPdfResult';
import logger from '~/utils/logger';
import prisma from '~/server/utils/prismaClient';
import toTaskContractData from '~/server/pdf/task-contract/toTaskContractData';
import { roles } from '~/server/graphql/schema/types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  if (!session || session?.user === null) {
    res.send(403);
    return;
  }

  const { id } = req.query;

  const task = await prisma.task.findUnique({
    where: { id: BigInt(id as string) },
    include: {
      jobType: true,
      customer: {
        include: { addresses: { include: { country: true }, where: { default: true } } }
      },
      user: {
        include: { addresses: { include: { country: true }, where: { default: true } } }
      }
    }
  });

  if (!task) {
    res.send(404);
    return;
  }

  if (session.user.email !== task.user.email) {
    const user = await prisma.user.findFirst({ where: { email: session.user.email } });

    if (user?.role !== roles.ADMIN) {
      res.send(404);
      return;
    }
  }

  try {
    const pdf = await generateTaskContract(toTaskContractData(task, task.user.language), task.user.language);
    if (pdf) {
      await sendPdfResult(res, pdf, `task-contract-${id}.pdf`);
      return;
    }
  } catch (err) {
    logger.error({ msg: 'An error was encountered during pdf generation', error: err });
  }

  res.send(500);
}

export default withSentry(handler);
