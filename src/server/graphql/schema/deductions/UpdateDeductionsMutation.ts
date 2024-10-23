import { arg, list, mutationField, nonNull } from 'nexus';
import { Context } from '~/server/graphql/context';

export const UpdateDeductionsMutation = mutationField((t) => {
  t.nonNull.field('updateDeductions', {
    type: 'BulkUpdateResult',
    args: {
      data: nonNull(arg({ type: 'DeductionUpdateInputArgs' })),
      where: nonNull(arg({ type: list('WhereUniqueInputArgs') }))
    },
    resolve: async (_, { data, where }, context: Context) => {
      const promises = where.map(async (deductionWhere) =>
        context.dataSources.deductionService.updateDeduction(deductionWhere?.id, data)
      );

      await Promise.all(promises);

      return { success: true };
    }
  });
});

export default UpdateDeductionsMutation;
