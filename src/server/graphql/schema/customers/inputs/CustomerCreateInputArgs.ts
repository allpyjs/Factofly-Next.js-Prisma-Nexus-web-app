import { inputObjectType } from 'nexus';

export const CustomerCreateInputArgs = inputObjectType({
  name: 'CustomerCreateInputArgs',
  definition(t) {
    t.nonNull.field('type', { type: 'CustomerTypeEnum' });
    t.nonNull.string('contact');
    t.string('vatId');
    t.BigInt('ean');
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.int('paymentDueDays');
    t.nonNull.string('phoneNumber');
    t.nonNull.field('address', { type: 'CustomerCreateNestedAddressInputArgs' });
    t.BigInt('createAsUserId');
  }
});

export default CustomerCreateInputArgs;
