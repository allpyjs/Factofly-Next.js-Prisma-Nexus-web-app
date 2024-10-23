import { inputObjectType } from 'nexus';

export const InvoiceUpdateNestedTaskInputArgs = inputObjectType({
  name: 'InvoiceUpdateNestedTaskInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.boolean('disconnect');
  }
});

export default InvoiceUpdateNestedTaskInputArgs;
