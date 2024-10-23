import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanServiceLogOrder(
  orderBy: NexusGenInputs['ServiceLogOrderByInputArgs'] | undefined | null
): Prisma.ServiceLogOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
