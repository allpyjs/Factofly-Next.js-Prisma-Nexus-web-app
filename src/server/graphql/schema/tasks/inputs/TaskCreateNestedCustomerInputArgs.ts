import { inputObjectType } from 'nexus';

export const TaskCreateNestedCustomerInputArgs = inputObjectType({
  name: 'TaskCreateNestedCustomerInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.field('create', { type: 'CustomerCreateInputArgs' });
  }
});

export default TaskCreateNestedCustomerInputArgs;
