import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanAddressCreateArgs from '../../addresses/helpers/cleanAddressCreateArgs';

async function cleanCustomerCreateArgs(
  data: NexusGenInputs['CustomerCreateInputArgs'],
  userId: bigint,
  parentId: bigint | number | undefined = undefined
): Promise<Prisma.CustomerCreateInput> {
  return {
    contact: data.contact,
    ean: data.ean,
    email: data.email,
    name: data.name,
    phoneNumber: data.phoneNumber,
    paymentDueDays: data.paymentDueDays,
    type: data.type,
    vatId: data.vatId,
    user: {
      connect: {
        id: userId
      }
    },
    parent: parentId
      ? {
          connect: {
            id: parentId
          }
        }
      : undefined,
    addresses: {
      create: cleanAddressCreateArgs(data.address.create)
    }
  };
}

export default cleanCustomerCreateArgs;
