import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';
import cleanDeductionStatusFilter from './cleanDeductionStatusFilter';

export default function cleanDeductionWhereArgs(
  where: NexusGenInputs['DeductionWhereInputArgs'] | null | undefined
): Prisma.DeductionWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.DeductionWhereInput = {
    id: cleanNumberFilter(where.id),
    status: cleanDeductionStatusFilter(where.status),
    active: cleanBooleanFilter(where.active),
    user: cleanUserWhereArgs(where.user),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };

  if (where.query) {
    const queryFields: Prisma.DeductionWhereInput[] = [
      { description: { contains: where.query, mode: 'insensitive' } },
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
