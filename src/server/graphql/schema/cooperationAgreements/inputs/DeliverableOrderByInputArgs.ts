import { inputObjectType } from 'nexus';

export const DeliverableOrderByInputArgs = inputObjectType({
  name: 'DeliverableOrderByInputArgs',
  definition(t) {
    t.field('description', { type: 'SortOrder' });
  }
});

export default DeliverableOrderByInputArgs;
