import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import { cleanAddressUpdateArgs } from '../../addresses/helpers/cleanAddressUpdateArgs';

export function cleanCustomerUpdateArgs(
  data: NexusGenInputs['CustomerUpdateInputArgs'],
  parentId: number | undefined = undefined
): Prisma.CustomerUpdateInput {
  return {
    active: data.active ?? undefined,
    contact: data.contact ?? undefined,
    ean: data.ean,
    email: data.email ?? undefined,
    name: data.name ?? undefined,
    phoneNumber: data.phoneNumber ?? undefined,
    paymentDueDays: data.paymentDueDays,
    type: data.type ?? undefined,
    vatId: data.vatId,
    parent: parentId
      ? {
          connect: {
            id: parentId
          }
        }
      : undefined,
    addresses: data.address
      ? {
          update: {
            data: cleanAddressUpdateArgs(data.address.update),
            where: { id: data.address.update.id }
          }
        }
      : undefined
  };
}

export default cleanCustomerUpdateArgs;
