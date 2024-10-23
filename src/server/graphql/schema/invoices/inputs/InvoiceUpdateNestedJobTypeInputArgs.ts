import { inputObjectType } from 'nexus';

export const InvoiceUpdateNestedJobTypeInputArgs = inputObjectType({
  name: 'InvoiceUpdateNestedJobTypeInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});
export default InvoiceUpdateNestedJobTypeInputArgs;
