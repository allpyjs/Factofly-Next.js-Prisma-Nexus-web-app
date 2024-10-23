import { inputObjectType } from 'nexus';

export const InvoiceStatusFilter = inputObjectType({
  name: 'InvoiceStatusFilter',
  definition(t) {
    t.field('equals', { type: 'InvoiceStatusEnum' });
    t.list.nonNull.field('in', { type: 'InvoiceStatusEnum' });
    t.list.nonNull.field('notIn', { type: 'InvoiceStatusEnum' });
    t.field('not', { type: 'InvoiceStatusEnum' });
  }
});

export default InvoiceStatusFilter;
