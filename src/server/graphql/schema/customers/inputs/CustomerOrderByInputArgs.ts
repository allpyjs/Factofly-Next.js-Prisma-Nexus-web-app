import { inputObjectType } from 'nexus';

export const CustomerOrderByInputArgs = inputObjectType({
  name: 'CustomerOrderByInputArgs',
  definition(t) {
    t.field('active', { type: 'SortOrder' });
    t.field('type', { type: 'SortOrder' });
    t.field('contact', { type: 'SortOrder' });
    t.field('vatId', { type: 'SortOrder' });
    t.field('ean', { type: 'SortOrder' });
    t.field('email', { type: 'SortOrder' });
    t.field('id', { type: 'SortOrder' });
    t.field('name', { type: 'SortOrder' });
    t.field('paymentDueDays', { type: 'SortOrder' });
    t.field('phoneNumber', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('userId', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('addressId', { type: 'SortOrder' });
    t.field('address', { type: 'AddressOrderByInputArgs' });
  }
});

export default CustomerOrderByInputArgs;
