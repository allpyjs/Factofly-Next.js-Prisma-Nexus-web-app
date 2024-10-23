import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';

export default function cleanJobTypeWhereArgs(
  where: NexusGenInputs['JobTypeWhereInputArgs'] | null | undefined
): Prisma.JobTypeWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    id: cleanNumberFilter(where.id),
    name_en: cleanStringFilter(where.name),
    active: cleanBooleanFilter(where.active),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };
}
