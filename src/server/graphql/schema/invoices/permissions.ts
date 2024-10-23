import { or, rule } from 'graphql-shield';
import apiConfig from '../../../../apiConfig';
import { Context } from '../../context';
import logger from '../../../../utils/logger';
import rules from '../rules';

const debug = apiConfig.graphql.debugPermissions;

const isInvoiceOwner = rule({
  cache: 'no_cache',
  // TODO: figure out how to use this fragment, instead of doing the db query below. See: https://www.graphql-shield.com/docs/advanced/fragments
  fragment: 'fragment InvoiceUserId on InvoiceLine { invoice { userId } }'
})(async (parent, args, context: Context) => {
  const { user } = context;

  let ruleResult = false;
  if (parent.invoice?.userId) {
    ruleResult = parent.invoice?.userId === user?.id;
  } else {
    const invoice = await context.prisma.invoice.findUnique({ where: { id: parent.invoiceId } });
    ruleResult = !!(invoice && invoice.userId === user?.id);
  }

  if (debug) {
    logger.info(`graphql/schema/invoices/permissions.ts: checking isInvoiceOwner (${ruleResult})`);
  }

  return ruleResult;
});

export default {
  Query: {
    invoice: rules.auth.isAuthenticatedUser,
    invoices: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createInvoice: rules.auth.isAuthenticatedUser,
    updateInvoice: rules.auth.isAuthenticatedUser,
    updateInvoices: rules.auth.isAdmin,
    sendInvoice: rules.auth.isAdmin
  },
  Invoice: or(rules.auth.isEmployee, rules.model.isContentOwner),
  InvoiceLine: or(rules.auth.isEmployee, isInvoiceOwner),
  InvoiceEdge: rules.auth.isAuthenticatedUser,
  InvoiceConnection: rules.auth.isAuthenticatedUser
};
