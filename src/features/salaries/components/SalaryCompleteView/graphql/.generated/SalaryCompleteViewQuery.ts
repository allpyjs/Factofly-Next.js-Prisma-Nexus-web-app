/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs, SalaryStatusEnum, InvoiceStatusEnum, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SalaryCompleteViewQuery
// ====================================================

export interface SalaryCompleteViewQuery_salary_user_address_country {
  __typename: "Country";
  /**
   * Country name in English
   */
  name_en: string;
}

export interface SalaryCompleteViewQuery_salary_user_address {
  __typename: "Address";
  /**
   * Street address
   */
  address: string;
  /**
   * Postal code of the address
   */
  postalCode: string;
  /**
   * City of the address
   */
  city: string;
  /**
   * Country connected to this address
   */
  country: SalaryCompleteViewQuery_salary_user_address_country;
}

export interface SalaryCompleteViewQuery_salary_user {
  __typename: "User";
  /**
   * Unique identifier for this type
   */
  id: any;
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
   * Whether this user is setting some money aside for the vacation payment
   */
  vacationPayment: boolean;
  /**
   * User language
   */
  language: string;
  /**
   * User address
   */
  address: SalaryCompleteViewQuery_salary_user_address | null;
}

export interface SalaryCompleteViewQuery_salary_invoices_customer {
  __typename: "Customer";
  /**
   * Customer name
   */
  name: string;
}

export interface SalaryCompleteViewQuery_salary_invoices {
  __typename: "Invoice";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * User-centric identifier
   */
  visibleId: any | null;
  /**
   * Date when invoiced
   */
  invoiceDate: any;
  /**
   * Invoice reference
   */
  reference: string | null;
  /**
   * Hours worked - insurance wise
   */
  hoursWorked: number;
  /**
   * Status enum
   */
  status: InvoiceStatusEnum;
  subtotalDkk: any;
  /**
   * The final amount that was paid by the customer
   */
  paidAmountDkk: any | null;
  /**
   * Is VAT applied to invoice
   */
  includeVat: boolean;
  totalPriceWithVat: number;
  /**
   * Should this invoice set aside some of the value to vacation payments
   */
  vacationPayment: boolean;
  /**
   * Invoiced currency
   */
  currency: string;
  totalPrice: number;
  /**
   * Customer of the invoice - see also customerCopy
   */
  customer: SalaryCompleteViewQuery_salary_invoices_customer;
}

export interface SalaryCompleteViewQuery_salary_deductions {
  __typename: "Deduction";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Status enum
   */
  status: DeductionStatusEnum;
  /**
   * When item were created
   */
  createdDate: any;
  /**
   * Short description of the deduction
   */
  description: string;
  /**
   * Url that the deduction image can be viewed at
   */
  imageUrl: string | null;
}

export interface SalaryCompleteViewQuery_salary {
  __typename: "Salary";
  /**
   * Unique identifier for this type
   */
  id: any;
  paymentDate: any;
  /**
   * Id of user
   */
  userId: any;
  status: SalaryStatusEnum;
  /**
   * Owner of the salary
   */
  user: SalaryCompleteViewQuery_salary_user;
  /**
   * Url that the payslip can be viewed at
   */
  payslipUrl: string | null;
  /**
   * Url that the fee invoice can be viewed at
   */
  feeInvoiceUrl: string | null;
  invoices: SalaryCompleteViewQuery_salary_invoices[] | null;
  deductions: SalaryCompleteViewQuery_salary_deductions[] | null;
}

export interface SalaryCompleteViewQuery {
  salary: SalaryCompleteViewQuery_salary | null;
}

export interface SalaryCompleteViewQueryVariables {
  where: WhereUniqueInputArgs;
}
