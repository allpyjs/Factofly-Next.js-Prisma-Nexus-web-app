import { inputObjectType } from 'nexus';

export const InvoiceCreateNestedCustomerInputArgs = inputObjectType({
  name: 'InvoiceCreateNestedCustomerInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.field('create', { type: 'CustomerCreateInputArgs' });
  }
});

export default InvoiceCreateNestedCustomerInputArgs;
