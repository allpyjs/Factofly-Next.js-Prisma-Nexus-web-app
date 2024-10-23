import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    deduction: rules.auth.isAuthenticatedUser,
    deductions: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createDeduction: rules.auth.isAuthenticatedUser,
    updateDeduction: rules.auth.isAuthenticatedUser,
    updateDeductions: rules.auth.isAdmin
  },
  Deduction: or(rules.auth.isEmployee, rules.model.isContentOwner),
  DeductionEdge: rules.auth.isAuthenticatedUser,
  DeductionConnection: rules.auth.isAuthenticatedUser
};
