/* eslint-disable no-underscore-dangle */
import { nonNull, queryField, stringArg } from 'nexus';
import { Context } from '../../context';
import VirkApiResult, { findValidItem } from '../../datasources/VirkApiResult';

export const VatSearchQuery = queryField((t) => {
  t.nonNull.list.nonNull.field('vatSearch', {
    type: 'VatSearchResult',
    args: {
      query: nonNull(stringArg())
    },
    resolve: async (parent, args, context: Context) => {
      const apiResults: VirkApiResult[] = await context.dataSources.virkApi.search(args.query);

      if (apiResults?.length > 0) {
        const results = apiResults
          .map((data) => data?._source?.Vrvirksomhed)
          .map((data) => {
            const address = findValidItem(data.beliggenhedsadresse);
            return {
              vatId: data.cvrNummer,
              phoneNumber: findValidItem(data.telefonNummer)?.kontaktoplysning,
              email: findValidItem(data.elektroniskPost)?.kontaktoplysning,
              name: data.virksomhedMetadata?.nyesteNavn?.navn,
              address: address
                ? [
                    address?.vejnavn,
                    address?.husnummerFra,
                    address?.bogstavFra,
                    address?.etage,
                    address?.sidedoer
                  ]
                    .filter((item) => item)
                    .join(' ')
                : undefined,
              city: address?.postdistrikt,
              postalCode: address?.postnummer
            };
          });

        return results;
      }
      return [];
    }
  });
});

export default VatSearchQuery;
