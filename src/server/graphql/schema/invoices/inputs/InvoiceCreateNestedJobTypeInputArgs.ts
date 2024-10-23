import { inputObjectType } from 'nexus';

export const InvoiceCreateNestedJobTypeInputArgs = inputObjectType({
  name: 'InvoiceCreateNestedJobTypeInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default InvoiceCreateNestedJobTypeInputArgs;
