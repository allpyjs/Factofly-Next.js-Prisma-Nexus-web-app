import { inputObjectType } from 'nexus';

export const DeliverableCreateInputArgs = inputObjectType({
  name: 'DeliverableCreateInputArgs',
  definition(t) {
    t.nonNull.string('description');
  }
});

export default DeliverableCreateInputArgs;
