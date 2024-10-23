import { or } from 'graphql-shield';
import rules from '../rules';

export default {
  Query: {
    cooperationAgreement: rules.auth.isAuthenticatedUser,
    cooperationAgreements: rules.auth.isAuthenticatedUser
  },
  Mutation: {
    createCooperationAgreement: rules.auth.isAuthenticatedUser,
    updateCooperationAgreement: rules.auth.isAuthenticatedUser
  },
  CooperationAgreement: or(rules.auth.isEmployee, rules.model.isContentOwner),
  CooperationAgreementEdge: rules.auth.isAuthenticatedUser,
  CooperationAgreementConnection: rules.auth.isAuthenticatedUser
};
