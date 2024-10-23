import { inputObjectType } from 'nexus';

export const ReferralWhereInputArgs = inputObjectType({
  name: 'ReferralWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('status', { type: 'ReferralStatusFilter' });
    t.field('email', { type: 'StringFilter' });
    t.field('referredUser', { type: 'UserWhereInputArgs' });

    t.string('query');
  }
});

export default ReferralWhereInputArgs;
