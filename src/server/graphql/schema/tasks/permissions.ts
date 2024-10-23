import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    task: rules.auth.isAuthenticatedUser,
    tasks: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createTask: rules.auth.isAuthenticatedUser,
    updateTask: rules.auth.isAuthenticatedUser
  },
  Task: or(rules.auth.isEmployee, rules.model.isContentOwner),
  TaskEdge: rules.auth.isAuthenticatedUser,
  TaskConnection: rules.auth.isAuthenticatedUser
};
