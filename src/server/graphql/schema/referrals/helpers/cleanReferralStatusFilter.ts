import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanReferralStatusFilter(
  statusData: NexusGenInputs['ReferralStatusFilter'] | null | undefined
): Prisma.EnumReferralStatusFilter | undefined {
  if (!statusData) {
    return undefined;
  }

  return {
    equals: statusData.equals ?? undefined,
    in: statusData.in ?? undefined,
    not: statusData.not ?? undefined,
    notIn: statusData.notIn ?? undefined
  };
}
