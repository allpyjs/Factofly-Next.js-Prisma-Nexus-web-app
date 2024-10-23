import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';

function cleanCountryWhereArgs(
  where: NexusGenInputs['CountryWhereInputArgs'] | null | undefined
): Prisma.CountryWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    code: cleanStringFilter(where.code),
    name_en: cleanStringFilter(where.name),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };
}

export default cleanCountryWhereArgs;
