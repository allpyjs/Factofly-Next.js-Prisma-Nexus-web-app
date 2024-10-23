import rules from '../rules';

export default {
  Query: {
    serviceLog: rules.auth.isAdmin,
    serviceLogs: rules.auth.isAdmin
  },
  ServiceLog: rules.auth.isAdmin,
  ServiceLogEdge: rules.auth.isAdmin,
  ServiceLogConnection: rules.auth.isAdmin
};
