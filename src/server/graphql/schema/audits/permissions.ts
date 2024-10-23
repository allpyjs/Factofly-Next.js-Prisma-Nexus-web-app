import rules from '../rules';

export default {
  Query: {
    audit: rules.auth.isAdmin,
    audits: rules.auth.isAdmin
  },
  Audit: rules.auth.isAdmin,
  AuditEdge: rules.auth.isAdmin,
  AuditConnection: rules.auth.isAdmin
};
