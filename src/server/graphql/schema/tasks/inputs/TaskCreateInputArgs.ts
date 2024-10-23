import { inputObjectType } from 'nexus';

export const TaskCreateInputArgs = inputObjectType({
  name: 'TaskCreateInputArgs',
  definition(t) {
    t.nonNull.field('endDate', { type: 'DateTime' });
    t.nonNull.int('expectedHours');
    t.string('reference');
    t.nonNull.field('startDate', { type: 'DateTime' });
    t.nonNull.boolean('termsAccepted');
    t.nonNull.string('title');
    t.nonNull.field('customer', { type: 'TaskCreateNestedCustomerInputArgs' });
    t.nonNull.field('jobType', { type: 'TaskCreateNestedJobTypeInputArgs' });
    t.nonNull.field('status', { type: 'TaskStatusEnum' });
    t.string('description');
    t.field('paymentType', { type: 'TaskPaymentTypeEnum' });
    t.decimal('paymentAmount');
    t.BigInt('createAsUserId');
  }
});

export default TaskCreateInputArgs;
