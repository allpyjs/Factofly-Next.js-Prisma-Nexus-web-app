import { inputObjectType } from 'nexus';

export const DateTimeFilter = inputObjectType({
  name: 'DateTimeFilter',
  definition(t) {
    t.string('equals');
    t.string('gt');
    t.string('gte');
    t.list.nonNull.string('in');
    t.string('lt');
    t.string('lte');
    t.list.nonNull.string('notIn');
    t.string('not');
  }
});

export default DateTimeFilter;
