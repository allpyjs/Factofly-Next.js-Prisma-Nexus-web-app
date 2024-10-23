import { inputObjectType } from 'nexus';

export const SalaryOrderByInputArgs = inputObjectType({
  name: 'SalaryOrderByInputArgs',
  definition(t) {
    t.field('id', { type: 'SortOrder' });
    t.field('paymentDate', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('userId', { type: 'SortOrder' });
    t.field('status', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
  }
});

export default SalaryOrderByInputArgs;
