import { inputObjectType } from 'nexus';

export const RoleFilter = inputObjectType({
  name: 'RoleFilter',
  definition(t) {
    t.field('equals', { type: 'RoleEnum' });
    t.list.nonNull.field('in', { type: 'RoleEnum' });
    t.list.nonNull.field('notIn', { type: 'RoleEnum' });
    t.field('not', { type: 'RoleEnum' });
  }
});

export default RoleFilter;
