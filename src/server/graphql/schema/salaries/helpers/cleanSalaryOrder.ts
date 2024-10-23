import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanSalaryOrder(
  orderBy: NexusGenInputs['SalaryOrderByInputArgs'] | undefined | null
): Prisma.SalaryOrderByWithRelationInput {
  return {
    ...cleanOrderBy(orderBy),
    user: orderBy?.user
      ? {
          ...cleanOrderBy(orderBy.user)
        }
      : undefined
  };
}
