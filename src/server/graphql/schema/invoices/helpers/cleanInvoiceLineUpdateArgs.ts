import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanInvoiceLineUpdateArgs(
  data: NexusGenInputs['InvoiceLineUpdateInputArgs']
): Prisma.InvoiceLineUpdateWithoutInvoiceInput {
  return {
    active: data.active ?? undefined,
    unitPrice: data.unitPrice ?? undefined,
    description: data.description ?? undefined,
    unit: data.unit ?? undefined,
    index: data.index ?? undefined,
    discountPercentage: data.discountPercentage ?? undefined,
    quantity: data.quantity ?? undefined
  };
}
