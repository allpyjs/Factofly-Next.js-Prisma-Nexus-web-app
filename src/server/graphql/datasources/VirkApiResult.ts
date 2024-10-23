interface PeriodType {
  periode: {
    gyldigTil: string | null;
  };
}

export const findValidItem = <T extends PeriodType>(items: T[]): any =>
  items.filter((item) => item?.periode?.gyldigTil === null)?.[0] || null;

export default interface VirkApiResult {
  _source: {
    Vrvirksomhed: {
      cvrNummer?: string | null;
      telefonNummer: {
        periode: {
          gyldigTil: string | null;
        };
        kontaktoplysning?: string | null;
      }[];
      elektroniskPost: {
        periode: {
          gyldigTil: string | null;
        };
        kontaktoplysning?: string | null;
      }[];
      virksomhedMetadata: {
        nyesteNavn: {
          navn?: string | null;
        };
      };
      beliggenhedsadresse: {
        periode: {
          gyldigTil: string | null;
        };
        vejnavn?: string | null;
        husnummerFra?: string | null;
        bogstavFra?: string | null;
        etage?: string | null;
        sidedoer?: string | null;
        postdistrikt?: string | null;
        postnummer?: string | null;
        landekode?: string | null;
      }[];
    };
  };
}
