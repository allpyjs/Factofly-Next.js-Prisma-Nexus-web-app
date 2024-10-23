import { inputObjectType } from 'nexus';

export const CustomerWhereInputArgs = inputObjectType({
  name: 'CustomerWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('type', { type: 'CustomerTypeFilter' });
    t.field('contact', { type: 'StringFilter' });
    t.field('vatId', { type: 'BigIntFilter' });
    t.field('ean', { type: 'BigIntFilter' });
    t.field('email', { type: 'StringFilter' });
    t.field('id', { type: 'BigIntFilter' });
    t.field('name', { type: 'StringFilter' });
    t.field('paymentDueDays', { type: 'IntFilter' });
    t.field('phoneNumber', { type: 'StringFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('private', { type: 'BoolFilter' });
    t.field('address', { type: 'AddressWhereInputArgs' });

    t.string('query');
  }
});

export default CustomerWhereInputArgs;
