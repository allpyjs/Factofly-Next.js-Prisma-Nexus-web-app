import { inputObjectType } from 'nexus';

export const DeductionOrderByInputArgs = inputObjectType({
  name: 'DeductionOrderByInputArgs',
  definition(t) {
    t.field('description', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('userId', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('status', { type: 'SortOrder' });
  }
});

export default DeductionOrderByInputArgs;
