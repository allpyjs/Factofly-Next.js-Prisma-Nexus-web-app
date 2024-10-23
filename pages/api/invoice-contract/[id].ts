import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import generateInvoiceContract from '~/server/pdf/invoice-contract/generateInvoiceContract';
import sendPdfResult from '~/server/pdf/sendPdfResult';
import logger from '~/utils/logger';
import prisma from '~/server/utils/prismaClient';
import toInvoiceContractData from '~/server/pdf/invoice-contract/toInvoiceContractData';
import { roles } from '~/server/graphql/schema/users/RoleEnum';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  if (!session || session?.user === null) {
    res.send(403);
    return;
  }

  const { id } = req.query;

  const invoice = await prisma.invoice.findUnique({
    where: { id: BigInt(id as string) },
    include: {
      lines: true,
      customer: {
        include: { addresses: { include: { country: true }, where: { default: true } } }
      },
      user: {
        include: { addresses: { include: { country: true }, where: { default: true } } }
      }
    }
  });

  if (!invoice) {
    res.send(404);
    return;
  }

  if (session.user.email !== invoice.user.email) {
    const user = await prisma.user.findFirst({ where: { email: session.user.email } });

    if (user?.role !== roles.ADMIN) {
      res.send(404);
      return;
    }
  }

  try {
    const pdf = await generateInvoiceContract(
      toInvoiceContractData(invoice, invoice.user.language),
      invoice.user.language
    );
    if (pdf) {
      await sendPdfResult(res, pdf, `invoice-contract-${id}.pdf`);
      return;
    }
  } catch (err) {
    logger.error({ msg: 'An error was encountered during pdf generation', error: err });
  }

  res.send(500);
}

export default withSentry(handler);
