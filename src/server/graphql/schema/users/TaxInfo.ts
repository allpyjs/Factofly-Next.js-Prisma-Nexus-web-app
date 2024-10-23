import { objectType } from 'nexus';

export const TaxInfo = objectType({
  name: 'TaxInfo',
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

    t.string('taxCard');
    t.string('personId');
    t.BigInt('countryId');

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

export default TaxInfo;
