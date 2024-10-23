import { inputObjectType } from 'nexus';

export const BigIntFilter = inputObjectType({
  name: 'BigIntFilter',
  definition(t) {
    t.BigInt('equals');
    t.BigInt('gt');
    t.BigInt('gte');
    t.list.nonNull.BigInt('in');
    t.BigInt('lt');
    t.BigInt('lte');
    t.list.nonNull.BigInt('notIn');
    t.BigInt('not');
  }
});

export default BigIntFilter;
