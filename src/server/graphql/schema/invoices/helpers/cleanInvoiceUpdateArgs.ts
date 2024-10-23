import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import filterEmpty from '../../../../../utils/filterEmpty';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerCreateArgs from '../../customers/helpers/cleanCustomerCreateArgs';
import cleanInvoiceLineCreateArgs from './cleanInvoiceLineCreateArgs';
import cleanInvoiceLineUpdateArgs from './cleanInvoiceLineUpdateArgs';
import cleanUndefined from '../../../../utils/cleanUndefined';
import convertCurrency from '../../../../utils/convertCurrency';

export default async function cleanInvoiceUpdateArgs(
  data: NexusGenInputs['InvoiceUpdateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint
): Promise<Prisma.InvoiceUpdateInput> {
  let customer;
  let customerFields: any = {
    customerContact: data.customerContact ?? undefined,
    customerEmail: data.customerEmail ?? undefined
  };
  if (data.customer) {
    if (data.customer?.create) {
      customer = await context.prisma.customer.create({
        data: await cleanCustomerCreateArgs(data.customer.create, userId),
        include: { addresses: { where: { default: true } }, user: true }
      });
      // sendEvent(topics.CREATE_CUSTOMER, createEventData(customer), context.pubSub);
    } else if (data.customer?.connect) {
      customer = await context.prisma.customer.findUnique({
        where: data.customer.connect!,
        include: { addresses: { where: { default: true } }, user: true }
      });
    }

    const customerAddress = customer.addresses[0];

    // customer has been updated, so update the saved customer details.
    customerFields = {
      ...customerFields,
      customerAddress: customerAddress.address,
      customerCity: customerAddress.city,
      customerEan: customer?.ean?.toString(),
      customerName: customer?.name!,
      customerPhoneNumber: customer?.phoneNumber!,
      customerVatId: customer?.vatId!,
      customerPostalCode: customerAddress.postalCode!,
      customer: {
        connect: {
          id: customer.id
        }
      }
    };
  }

  let totals = {};
  if (data.lines) {
    let subtotal = data.lines?.create
      ? data.lines.create.map((x) => x.unitPrice * x.quantity).reduce((prev, current) => prev + current, 0)
      : 0;
    subtotal += data.lines?.update
      ? data.lines.update
          .map((x) => (x.data ? x.data.unitPrice! * x.data.quantity! : 0))
          .reduce((prev, current) => prev + current, 0)
      : 0;
    const total = data.includeVat ? subtotal * 1.25 : subtotal;
    const subtotalDkk =
      data.currency === 'DKK' ? subtotal : await convertCurrency(data.currency!, 'DKK', subtotal, new Date());
    totals = {
      subtotal,
      total,
      subtotalDkk
    };
  }

  const result: Prisma.InvoiceUpdateInput = {
    ...customerFields,
    ...totals,
    active: data.active ?? undefined,
    sendInvoiceCopyTo: data.sendInvoiceCopyTo ?? undefined,
    endDate: data.endDate ?? undefined,
    currency: data.currency ?? undefined,
    jobType: data.jobType ?? undefined,
    reference: data.reference ?? undefined,
    startDate: data.startDate ?? undefined,
    paymentDueDays: data.paymentDueDays ?? undefined,
    invoiceDate: data.invoiceDate ?? undefined,
    status: data.status ?? undefined,
    vacationPayment: data.vacationPayment ?? undefined,
    includeVat: data.includeVat ?? undefined,
    paidAmountDkk: data.paidAmountDkk ?? undefined,
    termsAccepted: data.termsAccepted ?? undefined,
    updatedDate: new Date(),
    task: data.task
      ? {
          disconnect: data.task.disconnect ?? undefined,
          connect: data.task.connect ?? undefined
        }
      : undefined,
    lines: data.lines
      ? {
          create: data.lines.create?.length
            ? data.lines.create.map((line) => cleanInvoiceLineCreateArgs(line))
            : undefined,
          update: data.lines.update?.length
            ? data.lines.update
                .map((item) =>
                  item === null
                    ? undefined
                    : {
                        data: cleanInvoiceLineUpdateArgs(item.data),
                        where: item.where
                      }
                )
                .filter(filterEmpty)
            : undefined,
          delete: data.lines.delete ?? undefined
        }
      : undefined,
    hoursWorked: data.hoursWorked ?? undefined,
    note: data.note ?? undefined
  };

  return cleanUndefined(result);
}
