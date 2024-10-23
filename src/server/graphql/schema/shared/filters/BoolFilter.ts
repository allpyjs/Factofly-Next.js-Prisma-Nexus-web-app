import { inputObjectType } from 'nexus';

export const BoolFilter = inputObjectType({
  name: 'BoolFilter',
  definition(t) {
    t.boolean('equals');
    t.boolean('not');
  }
});

export default BoolFilter;
