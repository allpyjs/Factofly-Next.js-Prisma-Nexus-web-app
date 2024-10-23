import { enumType } from 'nexus';
import { invoiceStatusesKeys } from './invoiceStatuses';

export const InvoiceStatusEnum = enumType({
  name: 'InvoiceStatusEnum',
  members: invoiceStatusesKeys,
  description: 'Allowed invoice statuses'
});

export default InvoiceStatusEnum;
