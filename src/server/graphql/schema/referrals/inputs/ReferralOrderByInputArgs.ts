import { inputObjectType } from 'nexus';

export const ReferralOrderByInputArgs = inputObjectType({
  name: 'ReferralOrderByInputArgs',
  definition(t) {
    t.field('id', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
  }
});

export default ReferralOrderByInputArgs;
