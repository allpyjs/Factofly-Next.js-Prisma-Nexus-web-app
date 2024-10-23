export type ContractAddressData = {
  address: string;
  city: string;
  postalCode: string;
  region?: string | null;
  country: {
    name: string;
    code: string;
  };
};
