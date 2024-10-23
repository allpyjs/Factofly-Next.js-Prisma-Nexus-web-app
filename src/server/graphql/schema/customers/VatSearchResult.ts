/* eslint-disable no-underscore-dangle */
import { objectType } from 'nexus';

export const VatSearchResult = objectType({
  name: 'VatSearchResult',
  definition(t) {
    t.BigInt('vatId');
    t.string('phoneNumber');
    t.string('email');
    t.string('name');
    t.string('address');
    t.string('city');
    t.string('postalCode');
  }
});

export default VatSearchResult;
