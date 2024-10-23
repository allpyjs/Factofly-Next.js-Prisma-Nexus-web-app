import { inputObjectType } from 'nexus';

export const ConnectUniqueInputArgs = inputObjectType({
  name: 'ConnectUniqueInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default ConnectUniqueInputArgs;
