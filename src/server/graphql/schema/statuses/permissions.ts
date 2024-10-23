// import { or } from 'graphql-shield';
// import rules from '../rules';

export default {
  Query: {
    // statusLog: rules.auth.isAuthenticatedUser,
    // statusLogs: rules.auth.isAuthenticatedUser,
    // statuses: rules.auth.isAuthenticatedUser,
    // statusesDetails: rules.auth.isAuthenticatedUser,
  },
  Mutation: {
    // updateManyStatusLogs: rules.auth.isAuthenticatedUser,
  }
  // StatusDetail: rules.auth.isAuthenticatedUser,
  // StatusLog: or(rules.auth.isEmployee, rules.model.isContentOwner),
  // StatusLogEdge: rules.auth.isAuthenticatedUser

  // StatusLogConnection: rules.auth.isAuthenticatedUser,
};
