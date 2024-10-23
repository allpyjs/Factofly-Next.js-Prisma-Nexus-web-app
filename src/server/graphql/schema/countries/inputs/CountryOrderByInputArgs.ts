import { inputObjectType } from 'nexus';

export const CountryOrderByInputArgs = inputObjectType({
  name: 'CountryOrderByInputArgs',
  definition(t) {
    t.field('id', { type: 'SortOrder' });
    t.field('code', { type: 'SortOrder' });
    t.field('name_en', { type: 'SortOrder' });
    t.field('name_da', { type: 'SortOrder' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
    t.field('active', { type: 'SortOrder' });
  }
});

export default CountryOrderByInputArgs;
