import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Context } from '~/server/graphql/context';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerCreateArgs from '../../customers/helpers/cleanCustomerCreateArgs';
import cleanInvoiceLineCreateArgs from './cleanInvoiceLineCreateArgs';

export default async function cleanInvoiceCreateArgs(
  data: NexusGenInputs['InvoiceCreateInputArgs'],
  context: Context,
  userId: bigint | number
): Promise<Prisma.InvoiceCreateInput> {
  let customer;
  if (data.customer?.create) {
    customer = await context.prisma.customer.create({
      data: await cleanCustomerCreateArgs(data.customer.create, userId as bigint),
      include: { addresses: true, user: true }
    });
  } else {
    customer = await context.prisma.customer.findUnique({
      where: data.customer.connect!,
      include: { addresses: true, user: true }
    });
  }

  // Update customer copy parent if new customer is created.
  const customerId = customer?.id ? { id: customer.id } : data.customer.connect || undefined;

  const primaryAddress = customer!.addresses.filter((x) => x.default)[0];

  return {
    customer: {
      connect: customerId
    },
    visibleId: 0,
    customerAddress: primaryAddress.address,
    customerCity: primaryAddress.city,
    customerPostalCode: primaryAddress.postalCode!,
    customerContact: data.customerContact,
    customerEan: customer?.ean?.toString(),
    customerEmail: data.customerEmail,
    customerName: customer?.name!,
    customerPhoneNumber: customer?.phoneNumber!,
    customerVatId: customer?.vatId!,
    customerCountry: { connect: { id: primaryAddress.countryId } },

    active: true,
    endDate: data.endDate,
    currency: data.currency,
    jobType: data.jobType,
    reference: data.reference,
    startDate: data.startDate,
    sendInvoiceCopyTo: data.sendInvoiceCopyTo,
    paymentDueDays: data.paymentDueDays,
    invoiceDate: data.invoiceDate,
    status: data.status,
    vacationPayment: data.vacationPayment,
    includeVat: data.includeVat,
    termsAccepted: data.termsAccepted,
    task: data.task ?? undefined,
    lines: {
      create: data.lines.create.map(cleanInvoiceLineCreateArgs)
    },
    hoursWorked: data.hoursWorked,
    note: data.note,
    user: {
      connect: {
        id: userId
      }
    }
  };
}
