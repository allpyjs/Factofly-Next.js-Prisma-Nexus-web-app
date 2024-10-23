import { arg, nonNull, queryField } from 'nexus';
import toGraphQL from './helpers/mapping';
import auditsPagination from './auditPagination';
import { GraphQLContext } from '../../context';

export const AuditQuery = queryField((t) => {
  t.field('audit', {
    type: 'Audit',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: async (parent, args, context: GraphQLContext) =>
      toGraphQL(
        await context.prisma.audit.findUniqueOrThrow({
          where: { ...args.where }
        })
      )
  });
  auditsPagination(t);
});

export default AuditQuery;
