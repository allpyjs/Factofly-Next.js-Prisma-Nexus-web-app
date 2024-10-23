import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { Context } from '../../context';

export const UpdateTaskStatusMutation = mutationField((t) => {
  t.field('updateTaskStatus', {
    type: 'Task',
    args: {
      data: nonNull(arg({ type: 'TaskUpdateStatusInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { data, where }, context) => {
      if (!context.user || !context.auth.isEmployee(context.user)) {
        return false;
      }
      const task = await context.prisma.task.findUnique({
        where,
        select: { userId: true, status: true }
      });
      return !(!task || task.status === 'DRAFT' || data.status === 'DRAFT');
    },
    resolve: async (parent, { data, where }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }
      const oldTask = await context.prisma.task.findUniqueOrThrow({
        where
      });

      if (oldTask.status === data.status) {
        throw new Error('Already has this status');
      }

      const task = await context.prisma.task.update({
        data: {
          status: data.status
        },
        include: { user: true },
        where
      });

      // notify services
      const {
        dataSources: { auditService, notificationService, mailchimpService }
      } = context;
      await auditService.log('update', task.id, RecordType.TASK, oldTask, task);
      await notificationService.taskUpdated(task, oldTask);
      await mailchimpService.update(task.userId);

      return task;
    }
  });
});

export default UpdateTaskStatusMutation;
