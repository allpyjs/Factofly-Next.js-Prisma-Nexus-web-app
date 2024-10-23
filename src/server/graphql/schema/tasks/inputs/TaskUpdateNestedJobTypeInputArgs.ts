import { inputObjectType } from 'nexus';

export const TaskUpdateNestedJobTypeInputArgs = inputObjectType({
  name: 'TaskUpdateNestedJobTypeInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default TaskUpdateNestedJobTypeInputArgs;
