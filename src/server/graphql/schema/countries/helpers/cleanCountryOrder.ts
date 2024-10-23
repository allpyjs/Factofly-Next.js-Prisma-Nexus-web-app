import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

function cleanCountryOrder(
  orderBy: NexusGenInputs['CountryOrderByInputArgs'] | undefined | null
): Prisma.CountryOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}

export default cleanCountryOrder;
