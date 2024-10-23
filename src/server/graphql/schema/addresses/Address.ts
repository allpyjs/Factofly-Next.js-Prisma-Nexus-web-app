import { objectType } from 'nexus';
import { GraphQLContext } from '../../context';

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');

    t.nonNull.BigInt('userId', { description: 'User how owns this address' });
    t.nonNull.BigInt('countryId', { description: 'Id of country' });
    t.nonNull.field('country', {
      description: 'Country connected to this address',
      type: 'Country',
      resolve: async (parent: any, args, context: GraphQLContext) => {
        if (!parent.countryId) {
          throw new Error('Missing countryId');
        }
        if (parent.country) {
          return parent.country;
        }
        const country = await context.prisma.country.findUnique({
          where: { id: parent.countryId }
        });
        if (!country) {
          throw new Error('No matching country found');
        }
        return country;
      }
    });

    t.nonNull.string('address', { description: 'Street address' });
    t.nonNull.string('city', { description: 'City of the address' });
    t.string('region', { description: 'Region of the country' });
    t.nonNull.string('postalCode', { description: 'Postal code of the address' });
    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
  }
});

export default Address;
