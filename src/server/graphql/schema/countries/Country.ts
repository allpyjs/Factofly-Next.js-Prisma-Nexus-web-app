import { objectType } from 'nexus';

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('name_en', { description: 'Country name in English' });
    t.nonNull.string('name_da', { description: 'Country name in Danish' });
    t.nonNull.string('code', { description: 'Country code' });

    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
  }
});
export default Country;
