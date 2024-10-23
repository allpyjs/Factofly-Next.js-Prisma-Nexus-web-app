import { arg, nonNull, queryField } from 'nexus';
import customersPagination from './customersPagination';

export const CustomerQuery = queryField((t) => {
  customersPagination(t);
  t.field('customer', {
    type: 'Customer',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.customer.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default CustomerQuery;
