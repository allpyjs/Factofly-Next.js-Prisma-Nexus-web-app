import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanDeductionUpdateArgs(
  data: NexusGenInputs['DeductionUpdateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint
): Promise<Prisma.DeductionUpdateInput> {
  return {
    status: data.status ?? undefined,
    description: data.description ?? undefined,
    active: data.active ?? undefined,
    total: data.total ?? undefined,
    currency: data.currency ?? undefined,
    includeVat: data.includeVat ?? undefined,
    updatedDate: new Date(),
    user: {
      connect: {
        id: userId
      }
    }
  };
}
