import { inputObjectType } from 'nexus';

export const InvoiceUpdateNestedLinesInputArgs = inputObjectType({
  name: 'InvoiceUpdateNestedLinesInputArgs',
  definition(t) {
    t.list.nonNull.field('update', { type: 'InvoiceUpdateNestedLineInputArgs' });
    t.list.nonNull.field('create', { type: 'InvoiceLineCreateInputArgs' });
    t.list.nonNull.field('delete', { type: 'WhereUniqueInputArgs' });
  }
});

export default InvoiceUpdateNestedLinesInputArgs;
