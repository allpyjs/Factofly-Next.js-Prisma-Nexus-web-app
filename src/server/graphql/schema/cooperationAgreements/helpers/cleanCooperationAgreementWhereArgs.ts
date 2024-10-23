import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';

export default function cleanCooperationAgreementWhereArgs(
  where: NexusGenInputs['CooperationAgreementWhereInputArgs'] | null | undefined
): Prisma.CooperationAgreementWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.CooperationAgreementWhereInput = {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    startDate: cleanDateTimeFilter(where.startDate),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate),
    user: cleanUserWhereArgs(where.user)
  };

  if (where.query) {
    const queryFields: Prisma.CooperationAgreementWhereInput[] = [
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
