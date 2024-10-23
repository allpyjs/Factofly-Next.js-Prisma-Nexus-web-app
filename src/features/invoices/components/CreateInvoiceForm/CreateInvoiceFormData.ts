import { InvoiceStatusEnum } from '~/.generated/globalTypes';

export type InvoiceLineFormData = {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  index: number;
};

export type CreateInvoiceFormData = {
  customerId?: number;
  customerContact?: string;
  customerEmail?: string;
  sendInvoiceCopyTo?: string;

  taskId?: number;

  invoiceDate?: Date;
  startDate?: Date;
  endDate?: Date;

  jobTypeId?: number;
  hoursWorked?: number;
  reference?: string;

  paymentDueDays?: number;
  currency?: string;

  useCredit?: boolean;

  includeVat?: boolean;
  vacationPayment?: boolean;
  lines?: InvoiceLineFormData[];
  termsAccepted?: boolean;
  status: InvoiceStatusEnum;

  allowEarlyPayment?: boolean;
  earlyPayment?: boolean;

  createAsUserId?: number;
};
