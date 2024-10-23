import { inputObjectType } from 'nexus';

export const TaskUpdateNestedCustomerInputArgs = inputObjectType({
  name: 'TaskUpdateNestedCustomerInputArgs',
  definition(t) {
    t.field('connect', { type: 'WhereUniqueInputArgs' });
    t.field('create', { type: 'CustomerCreateInputArgs' });
  }
});
export default TaskUpdateNestedCustomerInputArgs;
