import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanDeductionCreateArgs(
  data: NexusGenInputs['DeductionCreateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint | number
): Promise<Prisma.DeductionCreateInput> {
  return {
    status: data.status,
    description: data.description,
    total: data.total,
    currency: data.currency,
    includeVat: data.includeVat,
    user: {
      connect: {
        id: userId
      }
    }
  };
}
