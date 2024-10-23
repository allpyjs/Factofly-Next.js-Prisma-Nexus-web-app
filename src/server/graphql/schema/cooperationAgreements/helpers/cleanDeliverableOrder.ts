import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanDeliverableOrder(
  orderBy: NexusGenInputs['DeliverableOrderByInputArgs'] | undefined | null
): Prisma.CooperationAgreementDeliverableOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
