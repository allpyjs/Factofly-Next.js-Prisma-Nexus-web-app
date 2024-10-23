import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

function cleanAddressCreateArgs(data: NexusGenInputs['AddressCreateInputArgs']): Prisma.AddressCreateInput {
  return {
    address: data.address,
    city: data.city,
    country: data.country,
    region: data.region,
    postalCode: data.postalCode,
    default: data.default
  };
}

export default cleanAddressCreateArgs;
