import { inputObjectType } from 'nexus';

export const ReferralCreateInputArgs = inputObjectType({
  name: 'ReferralCreateInputArgs',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('message');
    t.BigInt('createAsUserId');
  }
});

export default ReferralCreateInputArgs;
