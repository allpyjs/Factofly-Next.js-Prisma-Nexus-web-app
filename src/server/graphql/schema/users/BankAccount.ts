import { objectType } from 'nexus';

export const BankAccount = objectType({
  name: 'BankAccount',
  definition(t) {
    t.implements('Owned');
    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the settings',
      resolve: async (parent, _, context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });

    t.string('bankName');
    t.string('bankAccount');
    t.string('bankRegistration');
    t.boolean('default');

    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When item were created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When item last were updated'
    });
  }
});

export default BankAccount;
