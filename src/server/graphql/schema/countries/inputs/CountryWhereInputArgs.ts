import { inputObjectType } from 'nexus';

export const CountryWhereInputArgs = inputObjectType({
  name: 'CountryWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('code', { type: 'StringFilter' });
    t.field('name', { type: 'StringFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('active', { type: 'BoolFilter' });
  }
});

export default CountryWhereInputArgs;
