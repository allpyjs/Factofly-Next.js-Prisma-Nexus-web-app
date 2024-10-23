import { inputObjectType } from 'nexus';

export const InvoiceLineOrderByInputArgs = inputObjectType({
  name: 'InvoiceLineOrderByInputArgs',
  definition(t) {
    t.field('description', { type: 'SortOrder' });
    t.field('unitPrice', { type: 'SortOrder' });
    t.field('quantity', { type: 'SortOrder' });
    t.field('discountPercentage', { type: 'SortOrder' });
    t.field('unit', { type: 'SortOrder' });
    t.field('index', { type: 'SortOrder' });
  }
});

export default InvoiceLineOrderByInputArgs;
