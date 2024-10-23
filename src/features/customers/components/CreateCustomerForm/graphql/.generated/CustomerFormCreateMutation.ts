/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerCreateInputArgs, CustomerTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: CustomerFormCreateMutation
// ====================================================

export interface CustomerFormCreateMutation_createCustomer_address_country {
  __typename: "Country";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Country name in English
   */
  name_en: string;
}

export interface CustomerFormCreateMutation_createCustomer_address {
  __typename: "Address";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Street address
   */
  address: string;
  /**
   * Region of the country
   */
  region: string | null;
  /**
   * Country connected to this address
   */
  country: CustomerFormCreateMutation_createCustomer_address_country;
  /**
   * City of the address
   */
  city: string;
  /**
   * Postal code of the address
   */
  postalCode: string;
}

export interface CustomerFormCreateMutation_createCustomer_user {
  __typename: "User";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
}

export interface CustomerFormCreateMutation_createCustomer {
  __typename: "Customer";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Universal unique identifier
   */
  urn: string;
  /**
   * Customer name
   */
  name: string;
  /**
   * Customer email
   */
  email: string;
  /**
   * Whether early payment is allowed for this customer
   */
  allowEarlyPayment: boolean | null;
  /**
   * Customer address
   */
  address: CustomerFormCreateMutation_createCustomer_address;
  /**
   * Owner of the customer
   */
  user: CustomerFormCreateMutation_createCustomer_user;
  /**
   * Customer EAN number
   */
  ean: any | null;
  /**
   * Type of customer
   */
  type: CustomerTypeEnum;
  /**
   * Customer default due days
   */
  paymentDueDays: number | null;
  /**
   * Customer international vat id
   */
  vatId: string | null;
  /**
   * Customer contact person
   */
  contact: string;
  /**
   * Customer phone number
   */
  phoneNumber: string;
  /**
   * ID of the customer within e-conomic
   */
  economicCustomerId: number | null;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * When item were created
   */
  createdDate: any;
}

export interface CustomerFormCreateMutation {
  createCustomer: CustomerFormCreateMutation_createCustomer;
}

export interface CustomerFormCreateMutationVariables {
  input: CustomerCreateInputArgs;
}
