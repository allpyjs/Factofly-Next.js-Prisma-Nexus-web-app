import { Prisma } from '~/server/utils/prismaClient';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNullableNumberFilter from '../../shared/utils/cleanNullableNumberFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import { cleanCustomerTypeFilter } from './cleanCustomerTypeFilter';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';
import cleanAddressWhereArgs from '../../addresses/helpers/cleanAddressWhereArgs';

export default function cleanCustomerWhereArgs(
  where: NexusGenInputs['CustomerWhereInputArgs'] | null | undefined
): Prisma.CustomerWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.CustomerWhereInput = {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    type: cleanCustomerTypeFilter(where.type),
    contact: cleanStringFilter(where.contact),
    ean: cleanNullableNumberFilter(where.ean),
    email: cleanStringFilter(where.email),
    name: cleanStringFilter(where.name),
    paymentDueDays: cleanNullableNumberFilter(where.paymentDueDays) as Prisma.IntNullableFilter,
    phoneNumber: cleanStringFilter(where.phoneNumber),
    user: cleanUserWhereArgs(where.user),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate),
    addresses: { some: cleanAddressWhereArgs(where.address) }
  };

  if (where.query) {
    const queryFields: Prisma.CustomerWhereInput[] = [
      { name: { contains: where.query, mode: 'insensitive' } },
      { contact: { contains: where.query, mode: 'insensitive' } },
      { email: { contains: where.query, mode: 'insensitive' } },
      { phoneNumber: { contains: where.query, mode: 'insensitive' } },
      {
        user: {
          OR: [
            { firstName: { contains: where.query, mode: 'insensitive' } },
            { lastName: { contains: where.query, mode: 'insensitive' } }
          ]
        }
      }
    ];

    if (!Number.isNaN(Number(where.query))) {
      queryFields.push({ id: { equals: Number(where.query) } });
      queryFields.push({ userId: Number(where.query) });
    }

    filter = {
      AND: [
        {
          OR: queryFields
        },
        filter
      ]
    };
  }

  return filter;
}
