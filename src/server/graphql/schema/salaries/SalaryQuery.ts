import { arg, nonNull, queryField } from 'nexus';
import salariesPagination from './salariesPagination';

export const SalarysQuery = queryField((t) => {
  salariesPagination(t);
  t.field('salary', {
    type: 'Salary',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.salary.findUniqueOrThrow({
        where: { ...args.where },
        include: {
          user: true,
          invoices: true,
          deductions: true
        }
      })
  });
});

export default SalarysQuery;
