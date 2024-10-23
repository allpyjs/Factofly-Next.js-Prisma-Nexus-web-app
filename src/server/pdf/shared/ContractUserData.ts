import { ContractAddressData } from './ContractAddressData';

export type ContractUserData = {
  id: bigint;
  firstName: string;
  lastName: string;
  address: ContractAddressData;
};
