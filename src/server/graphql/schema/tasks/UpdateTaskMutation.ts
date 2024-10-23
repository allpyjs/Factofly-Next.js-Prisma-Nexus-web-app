import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanTaskUpdateArgs from './helpers/cleanTaskUpdateArgs';
import { taskStatuses } from './taskStatuses';

export const UpdateTaskMutation = mutationField((t) => {
  t.field('updateTask', {
    type: 'Task',
    args: {
      data: nonNull(arg({ type: 'TaskUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { data, where }, context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      const task = await context.prisma.task.findUnique({
        where,
        select: { userId: true, status: true }
      });

      if (!task) return false;
      if (context.auth.isAdmin(context.user)) return true;

      if (task.userId !== context.user.id) {
        return false;
      }
      if (task.status !== 'DRAFT' && task.status !== 'SENT') {
        return false;
      }
      if (data.customer?.connect?.id) {
        const customer = await context.prisma.customer.findUnique({
          where: { id: data.customer.connect.id },
          select: { userId: true }
        });
        if (!customer || customer.userId !== context.user.id) {
          return false;
        }
      }
      return data.status === 'DRAFT' || data.status === 'SENT';
    },
    resolve: async (parent, { data, where }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }
      const oldTask = await context.prisma.task.findUniqueOrThrow({
        where
      });

      const taskData = await cleanTaskUpdateArgs(data, context, oldTask.userId);
      const task = await context.prisma.task.update({
        data: {
          ...taskData
        },
        where
      });

      // notify services
      const {
        dataSources: { auditService, notificationService, mailchimpService, payrollService, eventService }
      } = context;

      const promises = [
        auditService.log('update', task.id, RecordType.TASK, oldTask, task),
        notificationService.taskUpdated(task, oldTask),
        mailchimpService.update(task.userId),
        eventService.recordEvent('task-updated', {
          taskId: task.id,
          status: task.status
        })
      ];

      if (task.status !== taskStatuses.DRAFT) {
        promises.push(payrollService.sendEmployee(task.userId));
      }

      return task as NexusGenObjects['Task'];
    }
  });
});

export default UpdateTaskMutation;
