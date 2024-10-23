import { inputObjectType } from 'nexus';

export const ConnectDisconnectUniqueInputArgs = inputObjectType({
  name: 'ConnectDisconnectUniqueInputArgs',
  definition(t) {
    t.nonNull.field('connect', { type: 'WhereUniqueInputArgs' });
  }
});

export default ConnectDisconnectUniqueInputArgs;
