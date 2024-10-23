import { inputObjectType } from 'nexus';

export const AuditOrderByInputArgs = inputObjectType({
  name: 'AuditOrderByInputArgs',
  definition(t) {
    t.field('createdDate', { type: 'SortOrder' });
  }
});

export default AuditOrderByInputArgs;
