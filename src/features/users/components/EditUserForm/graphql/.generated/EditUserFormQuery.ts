/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs, SalaryPaymentTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: EditUserFormQuery
// ====================================================

export interface EditUserFormQuery_user_jobType {
  __typename: "JobType";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Name of the job in English
   */
  name_en: string;
}

export interface EditUserFormQuery_user_bankAccount {
  __typename: "BankAccount";
  bankName: string | null;
  bankAccount: string | null;
  bankRegistration: string | null;
}

export interface EditUserFormQuery_user_taxInfo {
  __typename: "TaxInfo";
  personId: string | null;
  taxCard: string | null;
  countryId: any | null;
}

export interface EditUserFormQuery_user_bankAccountHidden {
  __typename: "BankAccount";
  bankName: string | null;
  bankAccount: string | null;
  bankRegistration: string | null;
}

export interface EditUserFormQuery_user_taxInfoHidden {
  __typename: "TaxInfo";
  personId: string | null;
  taxCard: string | null;
  countryId: any | null;
}

export interface EditUserFormQuery_user_address_country {
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

export interface EditUserFormQuery_user_address {
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
   * City of the address
   */
  city: string;
  /**
   * Postal code of the address
   */
  postalCode: string;
  /**
   * Id of country
   */
  countryId: any;
  /**
   * Country connected to this address
   */
  country: EditUserFormQuery_user_address_country;
}

export interface EditUserFormQuery_user {
  __typename: "User";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * User first name
   */
  firstName: string | null;
  /**
   * User last name
   */
  lastName: string | null;
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User phone number
   */
  phoneNumber: string | null;
  /**
   * Default user unit
   */
  unit: string | null;
  /**
   * Default user currency
   */
  currency: string | null;
  /**
   * User language
   */
  language: string;
  /**
   * When the node was created
   */
  createdDate: any;
  /**
   * When the node was last updated
   */
  updatedDate: any;
  /**
   * Referral string - where user signed up from
   */
  referral: string | null;
  /**
   * The e-conomic customer group number to use for this user
   */
  economicCustomerGroupId: number | null;
  /**
   * The e-conomic employee number to use for this user
   */
  economicEmployeeId: number | null;
  /**
   * When the salary should be paid out for the user
   */
  salaryPaymentType: SalaryPaymentTypeEnum | null;
  /**
   * The specific day of the month the salary should be paid out on (use 31 for last day)
   */
  salaryPaymentDay: number | null;
  /**
   * The amount of money needed to be reached before a payout will be made
   */
  salaryPaymentValue: number | null;
  /**
   * The base rate that will be charged for the user
   */
  baseRate: number | null;
  /**
   * Whether this user is setting some money aside for the vacation payment
   */
  vacationPayment: boolean;
  /**
   * Default job type
   */
  jobType: EditUserFormQuery_user_jobType | null;
  /**
   * User bank account
   */
  bankAccount: EditUserFormQuery_user_bankAccount | null;
  /**
   * User tax info
   */
  taxInfo: EditUserFormQuery_user_taxInfo | null;
  /**
   * User bank account
   */
  bankAccountHidden: EditUserFormQuery_user_bankAccountHidden | null;
  /**
   * User tax info
   */
  taxInfoHidden: EditUserFormQuery_user_taxInfoHidden | null;
  /**
   * User address
   */
  address: EditUserFormQuery_user_address | null;
}

export interface EditUserFormQuery {
  user: EditUserFormQuery_user | null;
}

export interface EditUserFormQueryVariables {
  where: WhereUniqueInputArgs;
}
