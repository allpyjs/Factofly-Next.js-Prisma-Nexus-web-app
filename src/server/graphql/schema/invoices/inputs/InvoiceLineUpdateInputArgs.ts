import { inputObjectType } from 'nexus';

export const InvoiceLineUpdateInputArgs = inputObjectType({
  name: 'InvoiceLineUpdateInputArgs',
  definition(t) {
    t.boolean('active');
    t.string('description');
    t.float('unitPrice');
    t.float('discountPercentage');
    t.string('unit');
    t.int('index');
    t.float('quantity');
    // t.field('product', { type: 'InvoiceLineUpdateNestedProductInputArgs' });
  }
});

export default InvoiceLineUpdateInputArgs;
