import { inputObjectType } from 'nexus';

export const InvoiceLineCreateInputArgs = inputObjectType({
  name: 'InvoiceLineCreateInputArgs',
  definition(t) {
    t.nonNull.string('description');
    t.nonNull.float('unitPrice');
    t.nonNull.float('quantity');
    t.float('discountPercentage');
    t.string('unit');
    t.nonNull.int('index');
    // t.field('product', { type: 'InvoiceLineCreateNestedProductInputArgs' });
  }
});

export default InvoiceLineCreateInputArgs;
