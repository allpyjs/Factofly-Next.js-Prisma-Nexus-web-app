import { inputObjectType } from 'nexus';

export const TaskOrderByInputArgs = inputObjectType({
  name: 'TaskOrderByInputArgs',
  definition(t) {
    t.field('id', { type: 'SortOrder' });
    t.field('active', { type: 'SortOrder' });
    t.field('expectedHours', { type: 'SortOrder' });
    t.field('reference', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('startDate', { type: 'SortOrder' });
    t.field('endDate', { type: 'SortOrder' });
    t.field('termsAccepted', { type: 'SortOrder' });
    t.field('title', { type: 'SortOrder' });
    t.field('customerId', { type: 'SortOrder' });
    t.field('customer', { type: 'CustomerOrderByInputArgs' });
    t.field('jobTypeId', { type: 'SortOrder' });
    t.field('jobType', { type: 'JobTypeOrderByInputArgs' });
    t.field('userId', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('status', { type: 'SortOrder' });
  }
});

export default TaskOrderByInputArgs;
