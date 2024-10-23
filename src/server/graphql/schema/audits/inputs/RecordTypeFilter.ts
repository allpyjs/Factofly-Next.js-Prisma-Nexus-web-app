import { inputObjectType } from 'nexus';

export const RecordTypeFilter = inputObjectType({
  name: 'RecordTypeFilter',
  definition(t) {
    t.field('equals', { type: 'RecordTypeEnum' });
    t.list.nonNull.field('in', { type: 'RecordTypeEnum' });
    t.list.nonNull.field('notIn', { type: 'RecordTypeEnum' });
    t.field('not', { type: 'RecordTypeEnum' });
  }
});

export default RecordTypeFilter;
