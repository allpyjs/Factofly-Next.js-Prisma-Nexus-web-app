import { inputObjectType } from 'nexus';

export const AddressCreateInputArgs = inputObjectType({
  name: 'AddressCreateInputArgs',
  definition(t) {
    t.nonNull.string('address');
    t.nonNull.boolean('default');
    t.nonNull.string('city');
    t.string('region');
    t.nonNull.string('postalCode');
    t.nonNull.field('country', { type: 'ConnectUniqueInputArgs' });
  }
});

export default AddressCreateInputArgs;
