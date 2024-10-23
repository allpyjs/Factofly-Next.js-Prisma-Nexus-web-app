import { inputObjectType } from 'nexus';

export const ServiceLogOrderByInputArgs = inputObjectType({
  name: 'ServiceLogOrderByInputArgs',
  definition(t) {
    t.field('createdDate', { type: 'SortOrder' });
  }
});

export default ServiceLogOrderByInputArgs;
