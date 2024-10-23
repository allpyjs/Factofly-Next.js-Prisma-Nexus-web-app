import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanUserOrder(
  orderBy: NexusGenInputs['UserOrderByInputArgs'] | undefined | null
): Prisma.UserOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
