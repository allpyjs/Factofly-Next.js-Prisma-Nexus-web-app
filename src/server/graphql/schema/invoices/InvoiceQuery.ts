import { arg, nonNull, queryField } from 'nexus';
import invoicesPagination from './invoicePagination';

export const InvoiceQuery = queryField((t) => {
  invoicesPagination(t);
  t.field('invoice', {
    type: 'Invoice',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.invoice.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default InvoiceQuery;
