import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from '@auth0/nextjs-auth0';
import { withSentry } from '@sentry/nextjs';
import { SalaryStatus } from '@prisma/client';
import prisma from '~/server/utils/prismaClient';
import logger from '~/utils/logger';
import { roles } from '~/server/graphql/schema/types';
import { decryptRecord } from '~/server/utils/encryption';
import apiConfig from '~/apiConfig';

export const config = {
  api: {
    bodyParser: false
  }
};

function padString(str: string, length: number) {
  return str.trim().padEnd(length, ' ').substring(0, length);
}

function padNumber(num: number | string, length: number) {
  return num.toString().padStart(length, '0').substring(0, length);
}

function convertToOre(amount: number) {
  return Math.round((amount ?? 0) * 100);
}

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

enum PaymentType {
  Standard = 1,
  SameDay = 2,
  Express = 3
}

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);

  logger.info(`pages/api/bank-file/index.ts: ${req.method} request started`);

  if (!session || session?.user === null) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user || user.role !== roles.ADMIN) {
    res.status(403).send({ error: 'unauthorised' });
    return;
  }

  const ids = (req.query.ids as string).split(',').map((x) => Number(x));

  try {
    const salaries = await prisma.salary.findMany({
      where: {
        status: { equals: SalaryStatus.SENT },
        paymentAmount: { gt: 0 },
        id: { in: ids }
      },
      select: {
        paymentAmount: true,
        invoices: {
          select: { id: true, visibleId: true }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            addresses: {
              where: { default: true, active: true },
              select: { address: true, postalCode: true, city: true }
            },
            bankAccounts: {
              where: { default: true, active: true },
              select: { bankRegistration: true, bankAccount: true }
            },
            taxInfo: {
              where: { active: true },
              select: { personId: true }
            }
          }
        }
      }
    });

    const dateString = new Date().toISOString().split('T')[0];
    const downloadAs = `${dateString}-bank-data.txt`;
    res.setHeader('Content-Disposition', `attachment; filename=${downloadAs}`);

    // output is in bankdata format, which can be found here https://www.bankdata.dk/wps/wcm/connect/bankdata/e54d5fa4-bd10-45bf-a133-91f88630e648/EDI,+Recorddescription+-+short+ver-sion.pdf?MOD=AJPERES
    const paymentDateString = dateString.replace(/-/g, '');
    const paymentStart =
      `"IB000000000000",` +
      `"${paymentDateString}",` +
      `"${padString('', 90)}",` +
      `"${padString('', 255)}",` +
      `"${padString('', 255)}",` +
      `"${padString('', 255)}"\r\n`;

    const domesticPayments = salaries.map((salary) => {
      const userInvoiceIds = salary.invoices.map((x) => x.visibleId).join(',');
      const invoiceIds = salary.invoices.map((x) => x.id).join(',');

      const amountInOre = convertToOre(Number(salary.paymentAmount ?? 0));
      const senderAccountNumber = apiConfig.transfer.accountNumber;
      const recipientRegNumber = decryptRecord(salary.user.bankAccounts[0].bankRegistration!);
      const recipientAccountNumber = decryptRecord(salary.user.bankAccounts[0].bankAccount!);
      const paymentType = PaymentType.Standard;
      const recipientText = `Factofly ${userInvoiceIds}`;
      const displayName = `${salary.user.firstName} ${salary.user.lastName}`;
      const senderText = `${user.id} ${displayName} ${invoiceIds}`;
      const cpr = decryptRecord(salary.user.taxInfo[0].personId!);
      const address = salary.user.addresses[0];

      let postalCode = Number(address.postalCode);
      if (Number.isNaN(postalCode)) postalCode = 0;

      return (
        `"IB030202000006",` +
        `"0001",` +
        `"${paymentDateString}",` +
        `"${padNumber(amountInOre, 13)}+",` +
        `"DKK",` +
        `"2",` + // From Bank Account
        `"${padNumber(senderAccountNumber, 15)}",` +
        `"2",` + // Transfer
        `"${padNumber(recipientRegNumber, 4)}",` +
        `"${padNumber(recipientAccountNumber, 10)}",` +
        `"${paymentType}",` +
        `"${padString(recipientText, 35)}",` +
        `"${padString(displayName, 32)}",` +
        `"${padString(address.address, 32)}",` +
        `"${padString('', 32)}",` + // address 2
        `"${padNumber(postalCode, 4)}",` +
        `"${padString(address.city, 32)}",` +
        `"${padString(recipientText, 35)}",` +
        `"${padString(recipientText, 35)}",` + // advice 1
        `"${padString('', 35)}",` + // advice 2
        `"${padString('', 35)}",` + // advice 3
        `"${padString('', 35)}",` + // advice 4
        `"${padString('', 35)}",` + // advice 5
        `"${padString('', 35)}",` +
        `"${padString('', 35)}",` + // primary document
        `"${padString(senderText, 35)}",` + // 27 - debtor identification of payment
        `"${padString(recipientText, 35)}",` + // 28 - end to end reference
        `"${padString('', 35)}",` + // creditor reference
        `"${padString('', 3)}",` + // easy account code
        `"${padString(cpr, 35)}",` +
        `"${padString('', 35)}",` + // reserved
        `"${padString('', 35)}",` + // reserved
        `"${padString('', 35)}",` + // reserved
        `"${padString('', 6)}",` + // reserved
        `"${padString('', 14)}"` + // blank space
        `\r\n`
      );
    });

    const totalInOre = convertToOre(
      salaries.reduce((prev, current) => prev + Number(current.paymentAmount ?? 0), 0)
    );

    const paymentEnd =
      `"IB999999999999",` +
      `"${paymentDateString}",` +
      `"${padNumber(salaries.length, 6)}",` +
      `"${padNumber(totalInOre, 13)}+",` +
      `"${padString('', 64)}",` +
      `"${padString('', 255)}",` +
      `"${padString('', 255)}",` +
      `"${padString('', 255)}"\r\n`;

    const fileContent = paymentStart + domesticPayments.join('') + paymentEnd;

    res.setHeader('Content-Type', 'application/text');
    res.status(200);
    res.send(Buffer.from(fileContent));
    res.end();
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: 'internal server error' });
  }
});

export default withSentry(apiRoute);
