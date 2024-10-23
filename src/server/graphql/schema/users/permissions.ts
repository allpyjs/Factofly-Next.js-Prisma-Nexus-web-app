import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    user: rules.auth.isAuthenticatedUser,
    me: rules.auth.isUser,
    users: rules.auth.isEmployee
  },
  Mutation: {
    updateUser: rules.auth.isAuthenticatedUser
  },
  BankAccount: or(rules.auth.isEmployee, rules.model.isContentOwner),
  TaxInfo: or(rules.auth.isEmployee, rules.model.isContentOwner),
  User: or(rules.auth.isEmployee, rules.model.isUser),
  UserEdge: rules.auth.isAuthenticatedUser,
  UserConnection: rules.auth.isAuthenticatedUser
};
