import { inputObjectType } from 'nexus';

export const AddressWhereInputArgs = inputObjectType({
  name: 'AddressWhereInputArgs',
  definition(t) {
    t.field('active', { type: 'BoolFilter' });
    t.field('address', { type: 'StringFilter' });
    t.field('city', { type: 'StringFilter' });
    t.field('country', { type: 'CountryWhereInputArgs' });
    t.field('id', { type: 'BigIntFilter' });
    t.field('userId', { type: 'BigIntFilter' });
    t.field('region', { type: 'StringFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('postalCode', { type: 'StringFilter' });
  }
});

export default AddressWhereInputArgs;
