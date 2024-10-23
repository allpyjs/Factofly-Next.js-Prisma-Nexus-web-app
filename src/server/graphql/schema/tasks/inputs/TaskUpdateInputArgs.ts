import { inputObjectType } from 'nexus';

export const TaskUpdateInputArgs = inputObjectType({
  name: 'TaskUpdateInputArgs',
  definition(t) {
    t.field('endDate', { type: 'DateTime' });
    t.int('expectedHours');
    t.string('reference');
    t.field('startDate', { type: 'DateTime' });
    t.boolean('termsAccepted');
    t.boolean('active');
    t.string('title');
    t.field('customer', { type: 'TaskUpdateNestedCustomerInputArgs' });
    t.field('jobType', { type: 'TaskUpdateNestedJobTypeInputArgs' });
    t.field('status', { type: 'TaskStatusEnum' });
    t.string('description');
    t.field('paymentType', { type: 'TaskPaymentTypeEnum' });
    t.decimal('paymentAmount');
  }
});
export default TaskUpdateInputArgs;
