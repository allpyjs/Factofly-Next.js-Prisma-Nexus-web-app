import { inputObjectType } from 'nexus';

export const AuditWhereInputArgs = inputObjectType({
  name: 'AuditWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('recordId', { type: 'BigIntFilter' });
    t.field('recordType', { type: 'RecordTypeFilter' });
    t.field('userId', { type: 'BigIntFilter' });
    t.field('event', { type: 'StringFilter' });
  }
});

export default AuditWhereInputArgs;
