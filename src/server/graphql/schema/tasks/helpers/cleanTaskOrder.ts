import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanTaskOrder(
  orderBy: NexusGenInputs['TaskOrderByInputArgs'] | undefined | null
): Prisma.TaskOrderByWithRelationInput {
  return {
    ...cleanOrderBy(orderBy),
    user: orderBy?.user
      ? {
          ...cleanOrderBy(orderBy.user)
        }
      : undefined,
    jobType: orderBy?.jobType
      ? {
          ...cleanOrderBy(orderBy.jobType)
        }
      : undefined,
    customer: orderBy?.customer
      ? {
          ...cleanOrderBy(orderBy.customer),
          addresses: orderBy.customer?.address
            ? {
                ...cleanOrderBy(orderBy.customer.address)
              }
            : undefined
        }
      : undefined
  };
}
