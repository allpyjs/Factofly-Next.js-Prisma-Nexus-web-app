import { objectType } from 'nexus';

export const StatusDetail = objectType({
  name: 'StatusDetail',
  definition(t) {
    t.nonNull.field('id', { type: 'StatusEnum', description: 'Status enum' });
    t.nonNull.string('description');
    t.nonNull.boolean('openStatus');
    t.nonNull.boolean('completedStatus');
    t.nonNull.boolean('invoicedStatus');
    t.nonNull.boolean('taskStatus');
    t.nonNull.boolean('invoiceStatus');
  }
});
export default StatusDetail;
