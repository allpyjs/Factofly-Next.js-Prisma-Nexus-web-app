import { inputObjectType } from 'nexus';

export const InvoiceCreateNestedTaskInputArgs = inputObjectType({
  name: 'InvoiceCreateNestedTaskInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default InvoiceCreateNestedTaskInputArgs;
