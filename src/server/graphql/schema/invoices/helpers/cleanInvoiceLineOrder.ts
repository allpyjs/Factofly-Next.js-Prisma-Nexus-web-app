import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanOrderBy from '../../shared/utils/cleanOrderBy';

export default function cleanInvoiceLineOrder(
  orderBy: NexusGenInputs['InvoiceLineOrderByInputArgs'] | undefined | null
): Prisma.InvoiceLineOrderByWithRelationInput {
  return cleanOrderBy(orderBy);
}
