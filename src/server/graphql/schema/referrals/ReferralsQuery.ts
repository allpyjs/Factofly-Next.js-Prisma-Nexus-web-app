import { arg, nonNull, queryField } from 'nexus';
import referralsPagination from './referralsPagination';

export const ReferralsQuery = queryField((t) => {
  referralsPagination(t);
  t.field('referral', {
    type: 'Referral',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.referral.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default ReferralsQuery;
