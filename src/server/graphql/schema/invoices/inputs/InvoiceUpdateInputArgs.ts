import { inputObjectType } from 'nexus';

export const InvoiceUpdateInputArgs = inputObjectType({
  name: 'InvoiceUpdateInputArgs',
  definition(t) {
    // customer
    t.field('customer', { type: 'InvoiceUpdateNestedCustomerInputArgs' });
    t.string('customerContact');
    t.string('customerEmail');
    t.string('sendInvoiceCopyTo');

    // task
    t.field('task', { type: 'InvoiceUpdateNestedTaskInputArgs' });

    // invoice info
    t.field('invoiceDate', { type: 'DateTime' });
    t.string('reference');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.field('jobType', { type: 'InvoiceUpdateNestedJobTypeInputArgs' });
    t.int('hoursWorked');

    t.boolean('useCredit');

    // payment details
    t.int('paymentDueDays');
    t.string('currency');
    t.boolean('vacationPayment');
    t.boolean('includeVat');
    t.boolean('earlyPayment');

    t.decimal('paidAmountDkk');

    // lines
    t.field('lines', { type: 'InvoiceUpdateNestedLinesInputArgs' });

    // status
    t.boolean('active');
    t.boolean('termsAccepted');
    t.string('note');
    t.field('status', { type: 'InvoiceStatusEnum' });
  }
});

export default InvoiceUpdateInputArgs;
