import { arg, mutationField, nonNull } from 'nexus';
import { GraphQLContext } from '~/server/graphql/context';

export const SendInvoiceMutation = mutationField((t) => {
  t.nonNull.field('sendInvoice', {
    type: 'SuccessResult',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: async (_, { where }, context: GraphQLContext) => {
      await context.dataSources.economicApi.sendInvoiceToEconomic(where.id);
      return { id: where.id, success: true };
    }
  });
});

export default SendInvoiceMutation;
