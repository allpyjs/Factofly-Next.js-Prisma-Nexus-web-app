import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanRecordTypeFilter from '../../audits/helpers/cleanRecordTypeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';

export default function cleanServiceLogWhereArgs(
  where: NexusGenInputs['ServiceLogWhereInputArgs'] | null | undefined
): Prisma.ServiceLogWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    recordType: cleanRecordTypeFilter(where.recordType),
    recordId: cleanNumberFilter(where.recordId),
    status: cleanStringFilter(where.status)
  };
}
