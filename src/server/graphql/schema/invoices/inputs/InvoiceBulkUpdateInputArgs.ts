import { inputObjectType } from 'nexus';

export const InvoiceBulkUpdateInputArgs = inputObjectType({
  name: 'InvoiceBulkUpdateInputArgs',
  definition(t) {
    t.field('data', { type: 'InvoiceUpdateInputArgs' });
    t.field('where', { type: 'WhereUniqueInputArgs' });
  }
});

export default InvoiceBulkUpdateInputArgs;
