import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanCooperationAgreementOrder(
  orderBy: NexusGenInputs['CooperationAgreementOrderByInputArgs'] | undefined | null
): Prisma.CooperationAgreementOrderByWithRelationInput {
  return {
    ...cleanOrderBy(orderBy),
    user: orderBy?.user
      ? {
          ...cleanOrderBy(orderBy.user)
        }
      : undefined
  };
}
