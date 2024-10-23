import { arg, nonNull, queryField } from 'nexus';
import toGraphQL from './helpers/mapping';
import serviceLogsPagination from './serviceLogPagination';

export const ServiceLogQuery = queryField((t) => {
  t.field('serviceLog', {
    type: 'ServiceLog',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: async (parent, args, context) =>
      toGraphQL(
        await context.prisma.serviceLog.findUniqueOrThrow({
          where: { ...args.where }
        })
      )
  });
  serviceLogsPagination(t);
});

export default ServiceLogQuery;
