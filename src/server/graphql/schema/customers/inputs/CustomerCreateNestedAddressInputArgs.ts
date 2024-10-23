import { inputObjectType } from 'nexus';

export const CustomerCreateNestedAddressInputArgs = inputObjectType({
  name: 'CustomerCreateNestedAddressInputArgs',
  definition(t) {
    t.nonNull.field('create', { type: 'AddressCreateInputArgs' });
  }
});

export default CustomerCreateNestedAddressInputArgs;
