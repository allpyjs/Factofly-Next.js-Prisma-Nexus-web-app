import { enumType } from 'nexus';
import { taskStatusesKeys } from './taskStatuses';

export const TaskStatusEnum = enumType({
  name: 'TaskStatusEnum',
  members: taskStatusesKeys,
  description: 'Allowed task statuses'
});

export default TaskStatusEnum;
