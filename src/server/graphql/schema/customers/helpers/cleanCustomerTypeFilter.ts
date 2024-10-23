import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export function cleanCustomerTypeFilter(
  customerTypeData: NexusGenInputs['CustomerTypeFilter'] | null | undefined
): Prisma.EnumCustomerTypeFilter | undefined {
  if (!customerTypeData) {
    return undefined;
  }

  return {
    equals: customerTypeData.equals ?? undefined,
    in: customerTypeData.in ?? undefined,
    not: customerTypeData.not ?? undefined,
    notIn: customerTypeData.notIn ?? undefined
  };
}

export default cleanCustomerTypeFilter;
