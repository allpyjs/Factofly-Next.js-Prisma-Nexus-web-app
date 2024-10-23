import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanAuditOrder(
  orderBy: NexusGenInputs['AuditOrderByInputArgs'] | undefined | null
): Prisma.AuditOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
