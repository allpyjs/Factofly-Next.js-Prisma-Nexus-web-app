import { ApolloError } from 'apollo-server-core';
import { arg, mutationField, nonNull } from 'nexus';
import { Context, GraphQLContext } from '~/server/graphql/context';

export const UpdateInvoiceMutation = mutationField((t) => {
  t.nonNull.field('updateInvoice', {
    type: 'Invoice',
    args: {
      data: nonNull(arg({ type: 'InvoiceUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { data, where }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      const invoice = await context.prisma.invoice.findUnique({
        where,
        select: { userId: true, status: true }
      });
      if (!invoice) return false;

      // user is an admin so let them update the data
      if (context.auth.isAdmin(context.user)) return true;

      // checks for whether the user can edit this go here
      if (invoice.userId !== context.user.id) {
        return false;
      }
      if (data.task?.connect?.id) {
        const task = await context.prisma.task.findUnique({
          where: { id: data.task.connect.id },
          select: { userId: true }
        });
        if (!task || task.userId !== context.user.id) {
          return false;
        }
      }
      if (data.customer?.connect?.id) {
        const customer = await context.prisma.customer.findUnique({
          where: { id: data.customer.connect.id },
          select: { userId: true }
        });
        if (!customer || customer.userId !== context.user.id) {
          return false;
        }
      }

      if (invoice.status !== 'DRAFT' && invoice.status !== 'SENT') {
        return new ApolloError(
          `You may only update invoices in the DRAFT or SENT states (invoice state is ${invoice.status})`,
          'FORBIDDEN'
        );
      }
      return true;
    },
    resolve: async (parent, { data, where }, context: GraphQLContext) =>
      context.dataSources.invoiceService.updateInvoice(where.id, data)
  });
});

export default UpdateInvoiceMutation;
