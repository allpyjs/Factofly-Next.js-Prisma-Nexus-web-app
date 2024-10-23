import { enumType } from 'nexus';

export type TaxCard = 'MAIN' | 'SECONDARY';

export const taxCards: Record<TaxCard, TaxCard> = {
  MAIN: 'MAIN',
  SECONDARY: 'SECONDARY'
};

export const TaxCardEnum = enumType({
  name: 'TaxCardEnum',
  members: Object.values(taxCards),
  description: 'The tax card used for the user'
});
