import { inputObjectType } from 'nexus';

export const InvoiceOrderByInputArgs = inputObjectType({
  name: 'InvoiceOrderByInputArgs',
  definition(t) {
    t.field('active', { type: 'SortOrder' });
    t.field('vacationPayment', { type: 'SortOrder' });
    t.field('currency', { type: 'SortOrder' });
    t.field('customerId', { type: 'SortOrder' });
    t.field('customer', { type: 'CustomerOrderByInputArgs' });
    t.field('endDate', { type: 'SortOrder' });
    t.field('hoursWorked', { type: 'SortOrder' });
    t.field('id', { type: 'SortOrder' });
    t.field('note', { type: 'SortOrder' });
    t.field('invoiceDate', { type: 'SortOrder' });
    t.field('paymentDueDays', { type: 'SortOrder' });
    t.field('reference', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('startDate', { type: 'SortOrder' });
    t.field('status', { type: 'SortOrder' });
    t.field('taskId', { type: 'SortOrder' });
    t.field('task', { type: 'TaskOrderByInputArgs' });
    t.field('termsAccepted', { type: 'SortOrder' });
    t.field('userId', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('total', { type: 'SortOrder' });
    t.field('includeVat', { type: 'SortOrder' });
    t.field('jobTypeId', { type: 'SortOrder' });
    t.field('jobType', { type: 'JobTypeOrderByInputArgs' });
  }
});
export default InvoiceOrderByInputArgs;
