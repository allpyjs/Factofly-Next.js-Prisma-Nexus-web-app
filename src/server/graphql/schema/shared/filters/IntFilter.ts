import { inputObjectType } from 'nexus';

export const IntFilter = inputObjectType({
  name: 'IntFilter',
  definition(t) {
    t.int('equals');
    t.int('gt');
    t.int('gte');
    t.list.nonNull.int('in');
    t.int('lt');
    t.int('lte');
    t.list.nonNull.int('notIn');
    t.int('not');
  }
});

export default IntFilter;
