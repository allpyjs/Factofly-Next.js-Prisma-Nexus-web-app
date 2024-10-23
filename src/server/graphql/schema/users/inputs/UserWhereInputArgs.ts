import { inputObjectType } from 'nexus';

export const UserWhereInputArgs = inputObjectType({
  name: 'UserWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('customer', { type: 'WhereUniqueInputArgs' });
    t.field('address', { type: 'WhereUniqueInputArgs' });
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('lastActive', { type: 'DateTimeFilter' });
    t.field('referral', { type: 'StringFilter' });
    t.field('email', { type: 'StringFilter' });
    t.field('phoneNumber', { type: 'StringFilter' });
    t.field('lastName', { type: 'StringFilter' });
    t.field('displayName', { type: 'StringFilter' });
    t.field('firstName', { type: 'StringFilter' });
    t.field('role', { type: 'RoleFilter' });

    t.string('query');
  }
});

export default UserWhereInputArgs;
