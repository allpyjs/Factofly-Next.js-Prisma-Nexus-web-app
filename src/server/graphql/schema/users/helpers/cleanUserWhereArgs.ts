import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanRoleFilter from './cleanRoleFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNullableStringFilter from '../../shared/utils/cleanNullableStringFilter';

export default function cleanUserWhereArgs(
  where: NexusGenInputs['UserWhereInputArgs'] | null | undefined
): Prisma.UserWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.UserWhereInput = {
    OR: where.displayName
      ? [
          { firstName: cleanStringFilter(where.displayName) },
          { lastName: cleanStringFilter(where.displayName) }
        ]
      : undefined,
    firstName: cleanStringFilter(where.firstName),
    lastName: cleanStringFilter(where.lastName),
    phoneNumber: cleanStringFilter(where.phoneNumber),
    id: cleanNumberFilter(where.id),
    email: cleanStringFilter(where.email),
    role: cleanRoleFilter(where.role),
    referral: cleanNullableStringFilter(where.referral),
    lastActive: cleanDateTimeFilter(where.lastActive),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate),
    active: cleanBooleanFilter(where.active),
    addresses: where.address
      ? {
          some: {
            id: where.address.id ?? undefined,
            default: true,
            active: true
          }
        }
      : undefined
  };

  if (where.query) {
    const queryFields: Prisma.UserWhereInput[] = [
      { firstName: { contains: where.query, mode: 'insensitive' } },
      { lastName: { contains: where.query, mode: 'insensitive' } },
      { email: { contains: where.query, mode: 'insensitive' } },
      { phoneNumber: { contains: where.query, mode: 'insensitive' } },
      { referral: { contains: where.query, mode: 'insensitive' } }
    ];

    if (!Number.isNaN(Number(where.query))) {
      queryFields.push({ id: { equals: Number(where.query) } });
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
