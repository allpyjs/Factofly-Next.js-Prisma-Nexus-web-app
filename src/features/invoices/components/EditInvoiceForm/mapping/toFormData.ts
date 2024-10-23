import {
  EditInvoiceFormQuery_invoice as InvoiceType,
  EditInvoiceFormQuery_invoice_lines as InvoiceLineType
} from '../graphql/.generated/EditInvoiceFormQuery';
import { InvoiceLineFormData, EditInvoiceFormData } from '../EditInvoiceFormData';

const toLineFormData = (input: InvoiceLineType): InvoiceLineFormData => ({
  id: input.id,
  description: input.description,
  quantity: input.quantity,
  unitPrice: input.unitPrice,
  index: input.index,
  deleted: false
});

export const toFormData = (input: InvoiceType): EditInvoiceFormData => ({
  id: input.id,
  customerId: input.customer.id,
  customerContact: input.customerContact,
  customerEmail: input.customerEmail,
  sendInvoiceCopyTo: input.sendInvoiceCopyTo ?? undefined,

  taskId: input.task?.id,
  userId: input.user.id,

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

  useCredit: false,

  creditsUsed: input.creditsUsed,
  discountType: input.discountType,
  discountValue: input.discountValue,
  discountMaxValue: input.discountMaxValue,

  lines: input.lines.map(toLineFormData),

  earlyPayment: input.earlyPayment,

  termsAccepted: input.termsAccepted,
  status: input.status,

  paidAmountDkk: input.paidAmountDkk
});

export default toFormData;
