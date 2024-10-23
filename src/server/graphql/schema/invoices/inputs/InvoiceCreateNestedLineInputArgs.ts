import { inputObjectType } from 'nexus';

export const InvoiceCreateNestedLineInputArgs = inputObjectType({
  name: 'InvoiceCreateNestedLineInputArgs',
  definition(t) {
    t.nonNull.list.nonNull.field('create', { type: 'InvoiceLineCreateInputArgs' });
  }
});

export default InvoiceCreateNestedLineInputArgs;
