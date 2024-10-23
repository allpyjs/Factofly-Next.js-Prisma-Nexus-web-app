/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AddressLookupQuery
// ====================================================

export interface AddressLookupQuery_vatSearch {
  __typename: "VatSearchResult";
  vatId: any | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  name: string | null;
  city: string | null;
  postalCode: string | null;
}

export interface AddressLookupQuery {
  vatSearch: AddressLookupQuery_vatSearch[];
}

export interface AddressLookupQueryVariables {
  query: string;
}
