import { inputObjectType } from 'nexus';

export const InvoiceCreateInputArgs = inputObjectType({
  name: 'InvoiceCreateInputArgs',
  definition(t) {
    // customer
    t.nonNull.field('customer', { type: 'InvoiceCreateNestedCustomerInputArgs' });
    t.nonNull.string('customerContact');
    t.nonNull.string('customerEmail');
    t.string('sendInvoiceCopyTo');

    // task
    t.field('task', { type: 'InvoiceCreateNestedTaskInputArgs' });

    // invoice info
    t.nonNull.field('invoiceDate', { type: 'DateTime' });
    t.string('reference');
    t.nonNull.field('startDate', { type: 'DateTime' });
    t.nonNull.field('endDate', { type: 'DateTime' });
    t.nonNull.field('jobType', { type: 'InvoiceCreateNestedJobTypeInputArgs' });
    t.nonNull.int('hoursWorked');

    t.nonNull.boolean('useCredit');

    // payment details
    t.nonNull.int('paymentDueDays');
    t.nonNull.string('currency');
    t.nonNull.boolean('vacationPayment');
    t.nonNull.boolean('includeVat');
    t.nonNull.boolean('earlyPayment');

    // lines
    t.nonNull.field('lines', { type: 'InvoiceCreateNestedLineInputArgs' });

    // status
    t.nonNull.boolean('termsAccepted');
    t.string('note');
    t.nonNull.field('status', { type: 'InvoiceStatusEnum' });

    // other
    t.BigInt('createAsUserId');
  }
});

export default InvoiceCreateInputArgs;
