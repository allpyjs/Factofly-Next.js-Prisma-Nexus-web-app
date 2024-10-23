import { inputObjectType } from 'nexus';

export const CustomerUpdateNestedAddressInputArgs = inputObjectType({
  name: 'CustomerUpdateNestedAddressInputArgs',
  definition(t) {
    t.nonNull.field('update', { type: 'AddressUpdateInputArgs' });
  }
});

export default CustomerUpdateNestedAddressInputArgs;
