/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SalaryWhereInputArgs, SalaryOrderByInputArgs, SalaryStatusEnum, InvoiceStatusEnum, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SalariesTableQuery
// ====================================================

export interface SalariesTableQuery_items_edges_node_user_address_country {
  __typename: "Country";
  /**
   * Country name in English
   */
  name_en: string;
}

export interface SalariesTableQuery_items_edges_node_user_address {
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
  country: SalariesTableQuery_items_edges_node_user_address_country;
}

export interface SalariesTableQuery_items_edges_node_user {
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
   * User language
   */
  language: string;
  /**
   * User address
   */
  address: SalariesTableQuery_items_edges_node_user_address | null;
}

export interface SalariesTableQuery_items_edges_node_invoices {
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
  /**
   * Should this invoice set aside some of the value to vacation payments
   */
  vacationPayment: boolean;
  /**
   * Invoiced currency
   */
  currency: string;
  totalPrice: number;
}

export interface SalariesTableQuery_items_edges_node_deductions {
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

export interface SalariesTableQuery_items_edges_node {
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
  grossIncome: any | null;
  paymentAmount: any | null;
  /**
   * Owner of the salary
   */
  user: SalariesTableQuery_items_edges_node_user;
  invoices: SalariesTableQuery_items_edges_node_invoices[] | null;
  deductions: SalariesTableQuery_items_edges_node_deductions[] | null;
}

export interface SalariesTableQuery_items_edges {
  __typename: "SalaryEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: SalariesTableQuery_items_edges_node;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Cursor
   */
  cursor: string;
}

export interface SalariesTableQuery_items {
  __typename: "SalaryConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: SalariesTableQuery_items_edges[];
}

export interface SalariesTableQuery {
  __typename: "Query";
  items: SalariesTableQuery_items;
}

export interface SalariesTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: SalaryWhereInputArgs | null;
  orderBy?: SalaryOrderByInputArgs | null;
}
