import { inputObjectType } from 'nexus';

export const DeliverableUpdateInputArgs = inputObjectType({
  name: 'DeliverableUpdateInputArgs',
  definition(t) {
    t.string('description');
  }
});

export default DeliverableUpdateInputArgs;
