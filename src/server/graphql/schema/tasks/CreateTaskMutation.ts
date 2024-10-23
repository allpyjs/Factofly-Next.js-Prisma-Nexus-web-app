import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { Context } from '../../context';
import cleanTaskCreateArgs from './helpers/cleanTaskCreateArgs';
import { taskStatuses } from './taskStatuses';

export const CreateTaskMutation = mutationField((t) => {
  t.field('createTask', {
    type: 'Task',
    args: {
      data: nonNull(arg({ type: 'TaskCreateInputArgs' }))
    },
    authorize: async (_, { data }, context) => {
      if (!context.user?.id || !context.auth.isUser(context.user)) {
        return false;
      }
      if (data.createAsUserId && !context.auth.isAdmin(context.user)) {
        return false;
      }

      const userId = data.createAsUserId ?? context.user.id;

      // check that the customer belongs to the user
      if (data.customer.connect?.id) {
        const customer = await context.prisma.customer.findUnique({
          where: { id: data.customer.connect.id },
          select: { userId: true }
        });
        if (!customer || customer.userId !== userId) {
          return false;
        }
      }

      return data.status === 'DRAFT' || data.status === 'SENT';
    },
    resolve: async (_, { data }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }
      const taskData = await cleanTaskCreateArgs(data, context, data.createAsUserId ?? context.user.id);
      const task = await context.prisma.task.create({
        data: {
          ...taskData
        },
        include: { user: true }
      });

      // notify services
      const {
        dataSources: { auditService, notificationService, mailchimpService, payrollService, eventService }
      } = context;
      const promises = [
        auditService.log('create', task.id, RecordType.TASK, taskData),
        notificationService.taskCreated(task),
        mailchimpService.update(Number(task.userId)),
        eventService.recordEvent('task-created', { taskId: task.id, status: task.status })
      ];

      if (task.status !== taskStatuses.DRAFT) {
        promises.push(payrollService.sendEmployee(task.userId));
      }

      await Promise.all(promises);

      return task;
    }
  });
});

export default CreateTaskMutation;
