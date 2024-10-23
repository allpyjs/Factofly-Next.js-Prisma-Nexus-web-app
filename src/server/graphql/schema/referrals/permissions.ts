import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    referral: rules.auth.isAuthenticatedUser,
    referrals: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createReferral: rules.auth.isAuthenticatedUser
  },
  Referral: or(rules.auth.isEmployee, rules.model.isContentOwner),
  ReferralEdge: rules.auth.isAuthenticatedUser,
  ReferralConnection: rules.auth.isAuthenticatedUser
};
