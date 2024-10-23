import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';
import cleanCountryWhereArgs from '../../countries/helpers/cleanCountryWhereArgs';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';

export default function cleanAddressWhereArgs(
  where: NexusGenInputs['AddressWhereInputArgs'] | null | undefined
): Prisma.AddressWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    address: cleanStringFilter(where.address),
    city: cleanStringFilter(where.city),
    region: cleanStringFilter(where.region),
    postalCode: cleanStringFilter(where.postalCode),
    country: cleanCountryWhereArgs(where.country),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };
}
