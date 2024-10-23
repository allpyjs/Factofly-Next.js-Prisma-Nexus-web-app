/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerWhereInputArgs, CustomerOrderByInputArgs, CustomerTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: CustomersTableQuery
// ====================================================

export interface CustomersTableQuery_items_edges_node_user {
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
}

export interface CustomersTableQuery_items_edges_node_address_country {
  __typename: "Country";
  /**
   * Country name in English
   */
  name_en: string;
}

export interface CustomersTableQuery_items_edges_node_address {
  __typename: "Address";
  /**
   * Street address
   */
  address: string;
  /**
   * City of the address
   */
  city: string;
  /**
   * Region of the country
   */
  region: string | null;
  /**
   * Postal code of the address
   */
  postalCode: string;
  /**
   * Country connected to this address
   */
  country: CustomersTableQuery_items_edges_node_address_country;
}

export interface CustomersTableQuery_items_edges_node {
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
   * Customer international vat id
   */
  vatId: string | null;
  /**
   * Owner of the customer
   */
  user: CustomersTableQuery_items_edges_node_user;
  /**
   * Customer email
   */
  email: string;
  /**
   * Customer phone number
   */
  phoneNumber: string;
  /**
   * Type of customer
   */
  type: CustomerTypeEnum;
  /**
   * Customer address
   */
  address: CustomersTableQuery_items_edges_node_address;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * When item were created
   */
  createdDate: any;
}

export interface CustomersTableQuery_items_edges {
  __typename: "CustomerEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: CustomersTableQuery_items_edges_node;
}

export interface CustomersTableQuery_items {
  __typename: "CustomerConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: CustomersTableQuery_items_edges[];
}

export interface CustomersTableQuery {
  __typename: "Query";
  items: CustomersTableQuery_items;
}

export interface CustomersTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: CustomerWhereInputArgs | null;
  orderBy?: CustomerOrderByInputArgs | null;
}
