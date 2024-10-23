import { inputObjectType } from 'nexus';

export const InvoiceUpdateNestedLineInputArgs = inputObjectType({
  name: 'InvoiceUpdateNestedLineInputArgs',
  definition(t) {
    t.nonNull.field('data', { type: 'InvoiceLineUpdateInputArgs' });
    t.nonNull.field('where', { type: 'WhereUniqueInputArgs' });
  }
});

export default InvoiceUpdateNestedLineInputArgs;
