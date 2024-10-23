import { inputObjectType } from 'nexus';

export const StringFilter = inputObjectType({
  name: 'StringFilter',
  definition(t) {
    t.string('contains');
    t.string('endsWith');
    t.string('equals');
    t.string('gt');
    t.string('gte');
    t.list.nonNull.string('in');
    t.string('lt');
    t.string('lte');
    t.list.nonNull.string('notIn');
    t.string('startsWith');
    t.string('not');
  }
});

export default StringFilter;
