import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanInvoiceLineCreateArgs(
  data: NexusGenInputs['InvoiceLineCreateInputArgs']
): Prisma.InvoiceLineCreateWithoutInvoiceInput {
  return {
    unitPrice: data.unitPrice,
    description: data.description,
    unit: data.unit,
    discountPercentage: data.discountPercentage ?? 0,
    quantity: data.quantity,
    index: data.index ?? 0
  };
}
