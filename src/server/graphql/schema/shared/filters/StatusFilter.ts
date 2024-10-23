import { inputObjectType } from 'nexus';

export const StatusFilter = inputObjectType({
  name: 'StatusFilter',
  definition(t) {
    t.field('equals', { type: 'StatusEnum' });
    t.list.nonNull.field('in', { type: 'StatusEnum' });
    t.list.nonNull.field('notIn', { type: 'StatusEnum' });
    t.field('not', { type: 'StatusEnum' });
  }
});

export default StatusFilter;
