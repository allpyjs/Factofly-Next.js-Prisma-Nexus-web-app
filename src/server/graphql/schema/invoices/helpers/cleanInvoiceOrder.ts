import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanInvoiceOrder(
  orderBy: NexusGenInputs['InvoiceOrderByInputArgs'] | undefined | null
): Prisma.InvoiceOrderByWithRelationInput {
  return {
    ...cleanOrderBy(orderBy),
    user: orderBy?.user
      ? {
          ...cleanOrderBy(orderBy.user)
        }
      : undefined,
    task: orderBy?.task
      ? {
          ...cleanOrderBy(orderBy.task)
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
