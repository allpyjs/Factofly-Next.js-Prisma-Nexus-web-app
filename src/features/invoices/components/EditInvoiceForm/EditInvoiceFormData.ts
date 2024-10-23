import { InvoiceStatusEnum } from '~/.generated/globalTypes';

export type InvoiceLineFormData = {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  index: number;
  id?: bigint;
  deleted: boolean;
};

export type EditInvoiceFormData = {
  id: bigint;
  customerId?: bigint;
  customerContact?: string;
  customerEmail?: string;
  sendInvoiceCopyTo?: string;

  taskId?: bigint;
  userId?: bigint;

  invoiceDate?: Date;
  startDate?: Date;
  endDate?: Date;

  jobTypeId?: bigint;
  hoursWorked?: number;
  reference?: string;

  paymentDueDays?: number;
  currency?: string;
  paidAmountDkk?: number;

  useCredit?: boolean;

  includeVat?: boolean;
  vacationPayment?: boolean;
  lines?: InvoiceLineFormData[];
  termsAccepted?: boolean;
  status: InvoiceStatusEnum;

  allowEarlyPayment?: boolean;
  earlyPayment?: boolean;

  creditsUsed: number;
  discountType: string;
  discountValue: number;
  discountMaxValue: number;
};

export default EditInvoiceFormData;
