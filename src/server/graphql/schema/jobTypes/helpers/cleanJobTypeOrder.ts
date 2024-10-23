import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanJobTypeOrder(
  orderBy: NexusGenInputs['JobTypeOrderByInputArgs'] | undefined | null
): Prisma.JobTypeOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
