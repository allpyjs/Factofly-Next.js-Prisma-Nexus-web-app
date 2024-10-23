import { inputObjectType } from 'nexus';

export const CustomerUpdateInputArgs = inputObjectType({
  name: 'CustomerUpdateInputArgs',
  definition(t) {
    t.boolean('active');
    t.field('type', { type: 'CustomerTypeEnum' });
    t.string('contact');
    t.field('vatId', { type: 'String' });
    t.field('ean', { type: 'BigInt' });
    t.string('email');
    t.string('name');
    t.int('paymentDueDays');
    t.string('phoneNumber');
    t.field('address', { type: 'CustomerUpdateNestedAddressInputArgs' });
    t.boolean('allowEarlyPayment');
  }
});

export default CustomerUpdateInputArgs;
