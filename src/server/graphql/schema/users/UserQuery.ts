import { customAlphabet } from 'nanoid';
import { arg, nonNull, queryField } from 'nexus';
import usersPagination from './usersPagination';

function generateReferralCode() {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
  return nanoid();
}

export const UserQuery = queryField((t) => {
  t.nonNull.field('me', {
    type: 'User',
    resolve: async (parent, _, context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      // make sure to refresh the emailVerification status before retrieving the user
      if (!context.user.emailVerified) {
        await context.dataSources.authManagementService.updateEmailVerification(context.user.email);
      }

      const data: any = { lastActive: new Date() };
      if (!context.user.referralLinkCode) {
        data.referralLinkCode = generateReferralCode();

        // collisions should be very rare, but we do a quick check anyway...
        let count = 0;
        do {
          // eslint-disable-next-line no-await-in-loop
          count = await context.prisma.user.count({
            where: { referralLinkCode: data.referralLinkCode }
          });

          if (count > 0) {
            data.referralLinkCode = generateReferralCode();
          }
        } while (count > 0);
      }

      const user = await context.prisma.user.update({
        where: { id: context.user.id },
        data
      });

      if (!user) {
        throw new Error('No matching user found');
      }
      return user;
    }
  });
  t.field('user', {
    type: 'User',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: async (parent, args, context) =>
      context.prisma.user.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
  usersPagination(t);
});

export default UserQuery;
