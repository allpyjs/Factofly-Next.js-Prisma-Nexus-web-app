/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanSalaryUpdateArgs(
  data: NexusGenInputs['SalaryUpdateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint
): Promise<Prisma.SalaryUpdateInput> {
  return {
    paymentDate: data.paymentDate ?? undefined,
    status: data.status ?? undefined
  };
}
