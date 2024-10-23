import { Address, Country } from '@prisma/client';
import languages from '~/constants/languages';
import { ContractAddressData } from '../ContractAddressData';

const toAddressData = (address: Address & { country: Country }, language: string): ContractAddressData => ({
  address: address.address,
  city: address.city,
  postalCode: address.postalCode,
  region: address.region,
  country: {
    name: language === languages.DA ? address.country.name_da : address.country.name_en,
    code: address.country.code
  }
});
export default toAddressData;
