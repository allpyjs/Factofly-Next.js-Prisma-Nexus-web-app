import rules from '../rules';

export default {
  Query: {
    jobType: rules.auth.isAuthenticatedUser,
    jobTypes: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    // updateJobType: rules.auth.isEmployee,
    // createJobType: rules.auth.isAdmin
  },
  JobType: rules.auth.isAuthenticatedUser
};
