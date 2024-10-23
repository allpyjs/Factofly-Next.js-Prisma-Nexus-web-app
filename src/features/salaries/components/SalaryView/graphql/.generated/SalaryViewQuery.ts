/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceWhereInputArgs, InvoiceOrderByInputArgs, InvoiceStatusEnum, SalaryPaymentTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SalaryViewQuery
// ====================================================

export interface SalaryViewQuery_items_edges_node_user {
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
}

export interface SalaryViewQuery_items_edges_node_customer {
  __typename: "Customer";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Customer name
   */
  name: string;
}

export interface SalaryViewQuery_items_edges_node {
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
   * Status enum
   */
  status: InvoiceStatusEnum;
  /**
   * Invoice reference
   */
  reference: string | null;
  /**
   * When item were created
   */
  createdDate: any;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * Invoiced currency
   */
  currency: string;
  /**
   * Hours worked - insurance wise
   */
  hoursWorked: number;
  /**
   * Should this invoice set aside some of the value to vacation payments
   */
  vacationPayment: boolean;
  overdue: boolean;
  dueDate: any;
  /**
   * Whether the invoice should be paid early or not
   */
  earlyPayment: boolean;
  /**
   * Owner of the invoice
   */
  user: SalaryViewQuery_items_edges_node_user;
  /**
   * Customer of the invoice - see also customerCopy
   */
  customer: SalaryViewQuery_items_edges_node_customer;
  /**
   * Date when invoiced
   */
  invoiceDate: any;
  totalPrice: number;
  totalPriceWithVat: number;
  subtotalDkk: any;
  /**
   * The final amount that was paid by the customer
   */
  paidAmountDkk: any | null;
  /**
   * Is VAT applied to invoice
   */
  includeVat: boolean;
}

export interface SalaryViewQuery_items_edges {
  __typename: "InvoiceEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: SalaryViewQuery_items_edges_node;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Cursor
   */
  cursor: string;
}

export interface SalaryViewQuery_items {
  __typename: "InvoiceConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: SalaryViewQuery_items_edges[];
}

export interface SalaryViewQuery {
  items: SalaryViewQuery_items;
}

export interface SalaryViewQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: InvoiceWhereInputArgs | null;
  orderBy?: InvoiceOrderByInputArgs | null;
}
