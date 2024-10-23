import { arg, nonNull, queryField } from 'nexus';
import deductionsPagination from './deductionsPagination';

export const DeductionsQuery = queryField((t) => {
  deductionsPagination(t);
  t.field('deduction', {
    type: 'Deduction',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.deduction.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default DeductionsQuery;
