import { ContractAddressData } from './ContractAddressData';

export type ContractCustomerData = {
  name: string;
  vatId?: string;
  ean?: number;
  address: ContractAddressData;
};
