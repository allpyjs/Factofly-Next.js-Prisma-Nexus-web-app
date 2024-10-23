import {
  InvoiceLineCreateInputArgs,
  InvoiceLineUpdateInputArgs,
  InvoiceUpdateInputArgs,
  InvoiceUpdateNestedLinesInputArgs,
  WhereUniqueInputArgs
} from '~/.generated/globalTypes';
import { toServerDate } from '~/utils/formatDate';
import { InvoiceLineFormData, EditInvoiceFormData } from '../EditInvoiceFormData';

const toLineUpdateInputArgs = (input: InvoiceLineFormData): InvoiceLineUpdateInputArgs => ({
  description: input.description!,
  quantity: input.quantity!,
  unitPrice: input.unitPrice!,
  index: input.index
});
const toLineCreateInputArgs = (input: InvoiceLineFormData): InvoiceLineCreateInputArgs => ({
  description: input.description!,
  quantity: input.quantity!,
  unitPrice: input.unitPrice!,
  index: input.index
});

const toLinesInputArgs = (lines: InvoiceLineFormData[]): InvoiceUpdateNestedLinesInputArgs => ({
  create: lines.filter((x) => !x.id && !x.deleted).map(toLineCreateInputArgs),
  delete: lines.filter((x) => x.id && x.deleted).map((x): WhereUniqueInputArgs => ({ id: x.id! })),
  update: lines
    .filter((x) => x.id && !x.deleted)
    .map((x) => ({ data: toLineUpdateInputArgs(x), where: { id: x.id! } }))
});

export const toInputArgs = (input: EditInvoiceFormData): InvoiceUpdateInputArgs => ({
  customer: { connect: { id: input.customerId } },
  task: input.taskId ? { connect: { id: input.taskId } } : undefined,
  jobType: { connect: { id: input.jobTypeId } },
  vacationPayment: !!input.vacationPayment,
  customerContact: input.customerContact,
  customerEmail: input.customerEmail,
  currency: input.currency!,
  paidAmountDkk: input.paidAmountDkk,
  reference: input.reference,
  invoiceDate: toServerDate(input.invoiceDate),
  startDate: toServerDate(input.startDate),
  endDate: toServerDate(input.endDate),
  hoursWorked: input.hoursWorked!,
  paymentDueDays: input.paymentDueDays!,
  includeVat: input.includeVat!,
  sendInvoiceCopyTo: input.sendInvoiceCopyTo,
  lines: toLinesInputArgs(input.lines!),
  termsAccepted: input.termsAccepted!,
  status: input.status,
  useCredit: input.useCredit,
  earlyPayment: !!input.earlyPayment
});

export default toInputArgs;
