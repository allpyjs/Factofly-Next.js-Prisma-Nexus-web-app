import { arg, nonNull, queryField } from 'nexus';
import cleanCountryOrder from './helpers/cleanCountryOrder';

export const CountriesQuery = queryField((t) => {
  t.nonNull.list.nonNull.field('countries', {
    description: 'List all countries',
    type: 'Country',
    args: {
      orderBy: arg({ type: 'CountryOrderByInputArgs' }),
      where: arg({ type: 'CountryWhereInputArgs' })
    },
    resolve: async (parent, args, context) =>
      context.prisma.country.findMany({ orderBy: cleanCountryOrder(args.orderBy) })
  });
  t.field('country', {
    type: 'Country',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.country.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default CountriesQuery;
