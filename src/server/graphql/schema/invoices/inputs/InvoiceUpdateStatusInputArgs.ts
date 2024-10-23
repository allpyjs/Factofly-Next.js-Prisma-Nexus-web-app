import { inputObjectType } from 'nexus';

export const InvoiceUpdateStatusInputArgs = inputObjectType({
  name: 'InvoiceUpdateStatusInputArgs',
  definition(t) {
    t.string('reason');
    t.nonNull.field('status', { type: 'InvoiceStatusEnum' });
  }
});

export default InvoiceUpdateStatusInputArgs;
