import { inputObjectType } from 'nexus';

export const AddressUpdateInputArgs = inputObjectType({
  name: 'AddressUpdateInputArgs',
  definition(t) {
    t.boolean('active');
    t.nonNull.BigInt('id');
    t.boolean('default');
    t.string('address');
    t.string('city');
    t.string('region');
    t.string('postalCode');
    t.field('country', { type: 'ConnectUniqueInputArgs' });
  }
});

export default AddressUpdateInputArgs;
