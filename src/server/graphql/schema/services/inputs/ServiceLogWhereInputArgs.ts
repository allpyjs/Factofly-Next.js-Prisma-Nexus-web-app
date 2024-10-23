import { inputObjectType } from 'nexus';

export const ServiceLogWhereInputArgs = inputObjectType({
  name: 'ServiceLogWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('recordId', { type: 'BigIntFilter' });
    t.field('recordType', { type: 'RecordTypeFilter' });
    t.field('status', { type: 'StringFilter' });
  }
});

export default ServiceLogWhereInputArgs;
