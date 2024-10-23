import { ApolloError } from 'apollo-server-core';
import { arg, mutationField, nonNull } from 'nexus';
import { Context } from '../../context';

export const UpdateDeductionMutation = mutationField((t) => {
  t.field('updateDeduction', {
    type: 'Deduction',
    args: {
      data: nonNull(arg({ type: 'DeductionUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { where }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      const deduction = await context.prisma.deduction.findUnique({
        where,
        select: { userId: true, status: true }
      });
      if (!deduction) return false;
      if (context.auth.isAdmin(context.user)) return true;

      if (deduction.userId !== context.user.id) {
        return false;
      }
      if (deduction.status !== 'DRAFT' && deduction.status !== 'SENT') {
        return new ApolloError(
          `You may only update deductions in the DRAFT or SENT states (deduction state is ${deduction.status})`
        );
      }
      return true;
    },
    resolve: async (parent, { data, where }, context: Context) =>
      context.dataSources.deductionService.updateDeduction(where.id, data)
  });
});

export default UpdateDeductionMutation;
