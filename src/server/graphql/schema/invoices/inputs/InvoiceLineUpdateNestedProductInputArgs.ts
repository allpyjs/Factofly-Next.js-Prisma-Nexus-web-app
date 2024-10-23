import { inputObjectType } from 'nexus';

export const InvoiceLineUpdateNestedProductInputArgs = inputObjectType({
  name: 'InvoiceLineUpdateNestedProductInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.boolean('disconnect');
  }
});

export default InvoiceLineUpdateNestedProductInputArgs;
