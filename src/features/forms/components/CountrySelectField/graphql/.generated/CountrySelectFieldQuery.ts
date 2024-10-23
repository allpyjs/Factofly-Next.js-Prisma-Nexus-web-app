/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountrySelectFieldQuery
// ====================================================

export interface CountrySelectFieldQuery_countries {
  __typename: "Country";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Country name in English
   */
  name_en: string;
  /**
   * Country name in Danish
   */
  name_da: string;
  /**
   * Country code
   */
  code: string;
}

export interface CountrySelectFieldQuery {
  /**
   * List all countries
   */
  countries: CountrySelectFieldQuery_countries[];
}
