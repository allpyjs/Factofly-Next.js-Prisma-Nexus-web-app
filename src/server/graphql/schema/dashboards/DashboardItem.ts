import { objectType } from 'nexus';

export const DashboardItem = objectType({
  name: 'DashboardItem',
  definition(t) {
    t.nonNull.int('count');
    t.nonNull.decimal('amount');
  }
});

export default DashboardItem;
