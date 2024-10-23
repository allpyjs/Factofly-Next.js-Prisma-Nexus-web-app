import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';
import cleanReferralStatusFilter from './cleanReferralStatusFilter';

export default function cleanReferralWhereArgs(
  where: NexusGenInputs['ReferralWhereInputArgs'] | null | undefined
): Prisma.ReferralWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.ReferralWhereInput = {
    id: cleanNumberFilter(where.id),
    status: cleanReferralStatusFilter(where.status),
    user: cleanUserWhereArgs(where.user),
    email: cleanStringFilter(where.email),
  };

  if (where.query) {
    const queryFields: Prisma.ReferralWhereInput[] = [
      { email: { contains: where.query, mode: 'insensitive' } },
      { user: { firstName: { contains: where.query, mode: 'insensitive' } } },
      { user: { lastName: { contains: where.query, mode: 'insensitive' } } }
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
