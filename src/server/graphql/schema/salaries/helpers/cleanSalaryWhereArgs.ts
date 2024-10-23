import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';
import cleanSalaryStatusFilter from './cleanSalaryStatusFilter';

export default function cleanSalaryWhereArgs(
  where: NexusGenInputs['SalaryWhereInputArgs'] | null | undefined
): Prisma.SalaryWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.SalaryWhereInput = {
    id: cleanNumberFilter(where.id),
    user: cleanUserWhereArgs(where.user),
    status: cleanSalaryStatusFilter(where.status),
    paymentDate: cleanDateTimeFilter(where.paymentDate),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };

  if (where.query) {
    const queryFields: Prisma.SalaryWhereInput[] = [
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
