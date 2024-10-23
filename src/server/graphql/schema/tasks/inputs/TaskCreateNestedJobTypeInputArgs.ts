import { inputObjectType } from 'nexus';

export const TaskCreateNestedJobTypeInputArgs = inputObjectType({
  name: 'TaskCreateNestedJobTypeInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default TaskCreateNestedJobTypeInputArgs;
