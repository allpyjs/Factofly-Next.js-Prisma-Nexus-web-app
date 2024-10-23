import { inputObjectType } from 'nexus';

export const CustomerTypeFilter = inputObjectType({
  name: 'CustomerTypeFilter',
  definition(t) {
    t.field('equals', { type: 'CustomerTypeEnum' });
    t.list.nonNull.field('in', { type: 'CustomerTypeEnum' });
    t.list.nonNull.field('notIn', { type: 'CustomerTypeEnum' });
    t.field('not', { type: 'CustomerTypeEnum' });
  }
});

export default CustomerTypeFilter;
