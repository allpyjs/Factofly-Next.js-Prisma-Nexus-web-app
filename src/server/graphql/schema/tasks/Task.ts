import { objectType } from 'nexus';
// import Invoice from './Invoice';
// import cleanInvoiceOrder from '../invoices/helpers/cleanInvoiceOrder';
// import { cleanStatusLogWhereArgs } from '../helper/whereCleaner';
// import { statuses } from '../statuses/statuses';

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.nonNull.string('title', { description: 'Short description of the job' });
    t.string('reference', { description: 'Reference field' });
    t.nonNull.int('expectedHours', { description: 'How many hours are expected in this task' });
    t.nonNull.boolean('termsAccepted', { description: 'Task terms are accepted' });
    t.nonNull.field('startDate', {
      type: 'DateTime',
      description: 'Date when the work is estimated to start from'
    });
    t.nonNull.field('endDate', {
      type: 'DateTime',
      description: 'Date when the work is estimated to end at'
    });
    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the task',
      resolve: async (parent, _, context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });

    t.nonNull.field('status', { type: 'TaskStatusEnum', description: 'Status enum' });

    t.string('description', { description: 'Description of the task' });
    t.field('paymentType', {
      type: 'TaskPaymentTypeEnum',
      description: 'How payment for the task is calculated'
    });
    t.decimal('paymentAmount', { description: 'Amount that the user should receive' });

    t.nonNull.BigInt('customerId', { description: 'Id of customer' });
    t.nonNull.field('customer', {
      type: 'Customer',
      description: 'Customer related to this task',
      resolve: async (parent, _, context) => {
        const customer = await context.prisma.customer.findUnique({
          where: { id: parent.customerId }
        });
        if (!customer) {
          throw new Error('No matching customer found');
        }
        return customer;
      }
    });

    t.nonNull.BigInt('jobTypeId', { description: 'Id of job type' });
    t.nonNull.field('jobType', {
      type: 'JobType',
      description: 'Job type of the task',
      resolve: async (parent, _, context) => {
        const jobType = await context.prisma.jobType.findUnique({
          where: { id: parent.jobTypeId }
        });
        if (!jobType) {
          throw new Error('No matching jobType found');
        }
        return jobType;
      }
    });
    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When item were created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When item last were updated'
    });
  }
});

export default Task;
