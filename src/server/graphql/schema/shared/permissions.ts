import rules from '../rules';

export default {
  BulkUpdateResult: rules.auth.isAuthenticatedUser,
  SuccessResult: rules.auth.isAuthenticatedUser
};
