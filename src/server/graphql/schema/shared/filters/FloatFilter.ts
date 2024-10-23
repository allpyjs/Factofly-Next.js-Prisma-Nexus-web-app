import { inputObjectType } from 'nexus';

export const FloatFilter = inputObjectType({
  name: 'FloatFilter',
  definition(t) {
    t.float('equals');
    t.float('gt');
    t.float('gte');
    t.list.nonNull.float('in');
    t.float('lt');
    t.float('lte');
    t.list.nonNull.float('notIn');
    t.float('not');
  }
});

export default FloatFilter;
