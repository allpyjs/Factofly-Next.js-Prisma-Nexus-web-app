import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export function cleanCustomerOrder(
  orderBy: NexusGenInputs['CustomerOrderByInputArgs'] | undefined | null
): Prisma.CustomerOrderByWithRelationInput {
  return {
    ...cleanOrderBy(orderBy),
    user: orderBy?.user
      ? {
          ...cleanOrderBy(orderBy.user)
        }
      : undefined
    // address: orderBy?.address
    //   ? {
    //       ...cleanOrderBy(orderBy.address),
    //       country: orderBy?.address?.country
    //         ? {
    //             ...cleanOrderBy(orderBy?.address.country)
    //           }
    //         : undefined
    //     }
    //   : undefined
  };
}

export default cleanCustomerOrder;
