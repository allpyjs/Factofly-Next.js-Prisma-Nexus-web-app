import { inputObjectType } from 'nexus';

export const TaskUpdateStatusInputArgs = inputObjectType({
  name: 'TaskUpdateStatusInputArgs',
  definition(t) {
    t.string('reason');
    t.nonNull.field('status', { type: 'TaskStatusEnum' });
  }
});

export default TaskUpdateStatusInputArgs;
