import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    salary: rules.auth.isAuthenticatedUser,
    salaries: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createSalary: rules.auth.isAdmin,
    updateSalary: rules.auth.isAdmin,
    fetchPayroll: rules.auth.isAdmin
  },
  Salary: or(rules.auth.isEmployee, rules.model.isContentOwner),
  SalaryEdge: rules.auth.isAuthenticatedUser,
  SalaryConnection: rules.auth.isAuthenticatedUser
};
