import { InvoiceCreateInputArgs, InvoiceLineCreateInputArgs } from '~/.generated/globalTypes';
import { toServerDate } from '~/utils/formatDate';
import { CreateInvoiceFormData, InvoiceLineFormData } from '../CreateInvoiceFormData';

export function toLineInputArgs(input: InvoiceLineFormData): InvoiceLineCreateInputArgs {
  return {
    description: input.description!,
    quantity: input.quantity!,
    unitPrice: input.unitPrice!,
    index: input.index
  };
}

export function toInputArgs(input: CreateInvoiceFormData): InvoiceCreateInputArgs {
  return {
    customer: { connect: { id: input.customerId } },
    task: input.taskId ? { connect: { id: input.taskId } } : undefined,
    jobType: { connect: { id: input.jobTypeId } },
    customerContact: input.customerContact!,
    customerEmail: input.customerEmail!,
    vacationPayment: !!input.vacationPayment,
    currency: input.currency!,
    invoiceDate: toServerDate(input.invoiceDate),
    startDate: toServerDate(input.startDate),
    endDate: toServerDate(input.endDate),
    reference: input.reference,
    hoursWorked: input.hoursWorked!,
    paymentDueDays: input.paymentDueDays!,
    includeVat: input.includeVat!,
    sendInvoiceCopyTo: input.sendInvoiceCopyTo,
    lines: {
      create: input.lines!.map(toLineInputArgs)
    },

    useCredit: !!input.useCredit,

    termsAccepted: input.termsAccepted!,
    status: input.status,
    createAsUserId: input.createAsUserId,
    earlyPayment: !!input.earlyPayment
  };
}
