import { arg, mutationField, nonNull } from 'nexus';
import { GraphQLContext } from '~/server/graphql/context';

export const FetchPayrollMutation = mutationField((t) => {
  t.nonNull.field('fetchPayroll', {
    type: 'SuccessResult',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: async (_, { where }, context: GraphQLContext) => {
      await context.dataSources.payrollService.updateSalary(where.id);
      return { id: where.id, success: true };
    }
  });
});

export default FetchPayrollMutation;
