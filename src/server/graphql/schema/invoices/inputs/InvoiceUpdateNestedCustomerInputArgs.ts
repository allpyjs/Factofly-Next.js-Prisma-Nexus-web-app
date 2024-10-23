import { inputObjectType } from 'nexus';

export const InvoiceUpdateNestedCustomerInputArgs = inputObjectType({
  name: 'InvoiceUpdateNestedCustomerInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.field('create', { type: 'CustomerCreateInputArgs' });
  }
});

export default InvoiceUpdateNestedCustomerInputArgs;
