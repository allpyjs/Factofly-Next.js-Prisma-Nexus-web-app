import {
  CopyInvoiceQuery_invoice as InvoiceType,
  CopyInvoiceQuery_invoice_lines as InvoiceLineType
} from '../graphql/.generated/CopyInvoiceQuery';
import { InvoiceLineFormData, CreateInvoiceFormData } from '../CreateInvoiceFormData';

const toLineFormData = (input: InvoiceLineType): InvoiceLineFormData => ({
  description: input.description,
  quantity: input.quantity,
  unitPrice: input.unitPrice,
  index: input.index
});

export const toFormData = (input: InvoiceType): CreateInvoiceFormData => ({
  customerId: input.customer?.id,
  customerContact: input.customerContact,
  customerEmail: input.customerEmail,
  sendInvoiceCopyTo: input.sendInvoiceCopyTo ?? undefined,

  taskId: input.task?.id,

  jobTypeId: input.jobType?.id,
  vacationPayment: input.vacationPayment,
  currency: input.currency,
  invoiceDate: input.invoiceDate,
  startDate: input.startDate,
  reference: input.reference ?? undefined,
  endDate: input.endDate,
  hoursWorked: input.hoursWorked,
  paymentDueDays: input.paymentDueDays!,
  includeVat: input.includeVat!,

  lines: input.lines?.map(toLineFormData),

  termsAccepted: input.termsAccepted,
  status: input.status
});

export default toFormData;
