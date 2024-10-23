import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanReferralCreateArgs(
  data: NexusGenInputs['ReferralCreateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint | number
): Promise<Prisma.ReferralCreateInput> {
  return {
    message: data.message,
    email: data.email,
    user: {
      connect: {
        id: userId
      }
    }
  };
}
