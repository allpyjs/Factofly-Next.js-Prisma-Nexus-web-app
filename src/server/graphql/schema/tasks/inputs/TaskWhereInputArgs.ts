import { inputObjectType } from 'nexus';

export const TaskWhereInputArgs = inputObjectType({
  name: 'TaskWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('customer', { type: 'CustomerWhereInputArgs' });
    t.field('endDate', { type: 'DateTimeFilter' });
    t.field('expectedHours', { type: 'IntFilter' });
    t.field('id', { type: 'BigIntFilter' });
    t.field('jobType', { type: 'JobTypeWhereInputArgs' });
    t.field('reference', { type: 'StringFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('startDate', { type: 'DateTimeFilter' });
    t.field('status', { type: 'TaskStatusFilter' });
    t.field('termsAccepted', { type: 'BoolFilter' });
    t.field('title', { type: 'StringFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('invoices', { type: 'InvoiceListRelationWhereArgs' });

    t.string('query');
  }
});

export default TaskWhereInputArgs;
