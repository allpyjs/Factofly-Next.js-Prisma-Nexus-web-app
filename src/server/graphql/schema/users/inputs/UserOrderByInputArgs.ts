import { inputObjectType } from 'nexus';

export const UserOrderByInputArgs = inputObjectType({
  name: 'UserOrderByInputArgs',
  definition(t) {
    t.field('active', { type: 'SortOrder' });
    t.field('address', { type: 'AddressOrderByInputArgs' });
    t.field('internalId', { type: 'SortOrder' });
    t.field('firstName', { type: 'SortOrder' });
    t.field('lastName', { type: 'SortOrder' });
    t.field('displayName', { type: 'SortOrder' });
    t.field('phoneNumber', { type: 'SortOrder' });
    t.field('title', { type: 'SortOrder' });
    t.field('email', { type: 'SortOrder' });
    t.field('role', { type: 'SortOrder' });
    t.field('referral', { type: 'SortOrder' });
    t.field('freelancerSituation', { type: 'SortOrder' });
    t.field('userSpecifiedReferral', { type: 'SortOrder' });
    t.field('lastActive', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
  }
});

export default UserOrderByInputArgs;
