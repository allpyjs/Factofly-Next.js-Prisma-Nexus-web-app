import { arg, nonNull, queryField } from 'nexus';
import tasksPagination from './tasksPagination';

export const TasksQuery = queryField((t) => {
  tasksPagination(t);
  t.field('task', {
    type: 'Task',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.task.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default TasksQuery;
