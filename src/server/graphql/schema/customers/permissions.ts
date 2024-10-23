import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    customer: rules.auth.isAuthenticatedUser,
    customers: rules.auth.isAuthenticatedUser,
    vatSearch: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createCustomer: rules.auth.isAuthenticatedUser,
    updateCustomer: rules.auth.isAuthenticatedUser
  },
  VatSearchResult: rules.auth.isAuthenticatedUser,
  Customer: or(rules.auth.isEmployee, rules.model.isContentOwner),
  CustomerEdge: rules.auth.isAuthenticatedUser,
  CustomerConnection: rules.auth.isAuthenticatedUser
};
