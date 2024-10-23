import { inputObjectType } from 'nexus';

export const InvoiceWhereInputArgs = inputObjectType({
  name: 'InvoiceWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('vacationPayment', { type: 'BoolFilter' });
    t.field('currency', { type: 'StringFilter' });
    t.field('customer', { type: 'CustomerWhereInputArgs' });
    t.field('endDate', { type: 'DateTimeFilter' });
    t.field('hoursWorked', { type: 'IntFilter' });
    t.field('id', { type: 'BigIntFilter' });
    t.field('note', { type: 'StringFilter' });
    t.field('invoiceDate', { type: 'DateTimeFilter' });
    t.field('paymentDueDays', { type: 'IntFilter' });
    t.field('reference', { type: 'StringFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('startDate', { type: 'DateTimeFilter' });
    t.field('status', { type: 'InvoiceStatusFilter' });
    t.field('termsAccepted', { type: 'BoolFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('task', { type: 'TaskWhereInputArgs' });
    t.field('includeVat', { type: 'BoolFilter' });
    t.field('jobType', { type: 'JobTypeWhereInputArgs' });
    t.field('salaryId', { type: 'BigIntFilter' });

    t.string('query');
  }
});

export default InvoiceWhereInputArgs;
