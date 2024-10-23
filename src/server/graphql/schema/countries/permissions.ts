import rules from '../rules';

export default {
  Query: {
    countries: rules.auth.isAuthenticatedUser,
    country: rules.auth.isAuthenticatedUser
  },
  Country: rules.auth.isAuthenticatedUser
};
