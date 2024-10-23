import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export function cleanAddressUpdateArgs(
  data: NexusGenInputs['AddressUpdateInputArgs']
): Prisma.AddressUpdateInput {
  return {
    active: data.active ?? undefined,
    address: data.address ?? undefined,
    city: data.city ?? undefined,
    country: data.country ?? undefined,
    region: data.region,
    postalCode: data.postalCode ?? undefined
  };
}

export default cleanAddressUpdateArgs;
