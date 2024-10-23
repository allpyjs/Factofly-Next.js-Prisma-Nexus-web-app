import { inputObjectType } from 'nexus';

export const AddressOrderByInputArgs = inputObjectType({
  name: 'AddressOrderByInputArgs',
  definition(t) {
    t.field('active', { type: 'SortOrder' });
    t.field('address', { type: 'SortOrder' });
    t.field('city', { type: 'SortOrder' });
    t.field('countryId', { type: 'SortOrder' });
    t.field('country', { type: 'CountryOrderByInputArgs' });
    t.field('id', { type: 'SortOrder' });
    t.field('region', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('userId', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('postalCode', { type: 'SortOrder' });
  }
});

export default AddressOrderByInputArgs;
