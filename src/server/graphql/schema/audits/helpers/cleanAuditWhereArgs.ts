import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanRecordTypeFilter from './cleanRecordTypeFilter';

export default function cleanAuditWhereArgs(
  where: NexusGenInputs['AuditWhereInputArgs'] | null | undefined
): Prisma.AuditWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    recordType: cleanRecordTypeFilter(where.recordType),
    recordId: cleanNumberFilter(where.recordId),
    userId: cleanNumberFilter(where.userId),
    event: cleanStringFilter(where.event)
  };
}
