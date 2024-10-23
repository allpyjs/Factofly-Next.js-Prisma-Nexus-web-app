import prisma from './prismaClient';

export default async function convertCurrency(
  source: string,
  target: string,
  amount: Number,
  date: Date
): Promise<number> {
  const result = await prisma.exchangeRate.findFirst({
    select: { exchangeRate: true },
    where: {
      sourceCurrency: source,
      targetCurrency: target,
      validFromDate: { lte: date },
      OR: [
        {
          validToDate: null
        },
        {
          validToDate: { gt: date }
        }
      ]
    },
    orderBy: {
      validFromDate: 'desc'
    }
  });

  if (!result) {
    throw Error(`Unable to find exchange rate for ${source}:${target} at ${date}`);
  }

  return Number(amount) * Number(result.exchangeRate);
}
