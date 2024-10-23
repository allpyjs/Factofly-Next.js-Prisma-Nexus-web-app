import { inputObjectType } from 'nexus';

export const WhereUniqueInputArgs = inputObjectType({
  name: 'WhereUniqueInputArgs',
  definition(t) {
    t.nonNull.BigInt('id');
  }
});

export default WhereUniqueInputArgs;
