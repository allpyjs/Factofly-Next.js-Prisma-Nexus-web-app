import { inputObjectType } from 'nexus';

export const TaskStatusFilter = inputObjectType({
  name: 'TaskStatusFilter',
  definition(t) {
    t.field('equals', { type: 'TaskStatusEnum' });
    t.list.nonNull.field('in', { type: 'TaskStatusEnum' });
    t.list.nonNull.field('notIn', { type: 'TaskStatusEnum' });
    t.field('not', { type: 'TaskStatusEnum' });
  }
});

export default TaskStatusFilter;
