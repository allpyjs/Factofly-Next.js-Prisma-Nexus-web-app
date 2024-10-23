import rules from '../rules';

export default {
  Query: {
    dashboard: rules.auth.isAuthenticatedUser
  },
  Dashboard: rules.auth.isAuthenticatedUser,
  DashboardItem: rules.auth.isAuthenticatedUser
};
