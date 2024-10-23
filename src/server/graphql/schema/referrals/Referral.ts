import { objectType } from 'nexus';

export const Referral = objectType({
  name: 'Referral',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.nonNull.string('email', { description: 'The recipient email address' });
    t.nonNull.string('message', { description: 'The referral message' });
    t.nonNull.field('status', { type: 'ReferralStatusEnum', description: 'Status enum' });

    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the task',
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
    t.field('referredUser', {
      type: 'User',
      description: 'User referred with this referral',
      resolve: async (parent, args, context) => {
        const user = await context.prisma.user.findFirst({
          where: {
            AND: [
              { email: parent.email },
              { referredByUserId: parent.userId },
            ]
          }
        });
        return user;
      }
    });
  }
});

export default Referral;
