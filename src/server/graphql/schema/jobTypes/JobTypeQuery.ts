import { arg, nonNull, queryField } from 'nexus';
import cleanJobTypeOrder from './helpers/cleanJobTypeOrder';

export const JobTypeQuery = queryField((t) => {
  t.nonNull.list.nonNull.field('jobTypes', {
    description: 'List all job types',
    type: 'JobType',
    args: {
      orderBy: arg({ type: 'JobTypeOrderByInputArgs' }),
      where: arg({ type: 'JobTypeWhereInputArgs' })
    },
    resolve: (parent, args, context) =>
      context.prisma.jobType.findMany({ orderBy: cleanJobTypeOrder(args.orderBy) })
  });
  t.field('jobType', {
    type: 'JobType',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.jobType.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default JobTypeQuery;
