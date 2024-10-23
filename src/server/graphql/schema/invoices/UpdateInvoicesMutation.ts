import { arg, list, mutationField, nonNull } from 'nexus';
import { Context } from '~/server/graphql/context';

export const UpdateInvoicesMutation = mutationField((t) => {
  t.nonNull.field('updateInvoices', {
    type: 'BulkUpdateResult',
    args: {
      data: nonNull(arg({ type: list('InvoiceBulkUpdateInputArgs') }))
    },
    resolve: async (_, { data }, context: Context) => {
      const promises = data.map(async (invoice) =>
        context.dataSources.invoiceService.updateInvoice(invoice!.where!.id, invoice!.data!)
      );

      await Promise.all(promises);

      return { success: true };
    }
  });
});

export default UpdateInvoicesMutation;
