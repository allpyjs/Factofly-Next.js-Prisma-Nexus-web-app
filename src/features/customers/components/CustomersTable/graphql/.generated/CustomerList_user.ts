/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL fragment: CustomerList_user
// ====================================================

export interface CustomerList_user_items_edges_node_user {
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

export interface CustomerList_user_items_edges_node_address_country {
  __typename: "Country";
  /**
   * Country name in English
   */
  name_en: string;
}

export interface CustomerList_user_items_edges_node_address {
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
  country: CustomerList_user_items_edges_node_address_country;
}

export interface CustomerList_user_items_edges_node {
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
  user: CustomerList_user_items_edges_node_user;
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
  address: CustomerList_user_items_edges_node_address;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * When item were created
   */
  createdDate: any;
}

export interface CustomerList_user_items_edges {
  __typename: "CustomerEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: CustomerList_user_items_edges_node;
}

export interface CustomerList_user_items {
  __typename: "CustomerConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: CustomerList_user_items_edges[];
}

export interface CustomerList_user {
  __typename: "Query";
  items: CustomerList_user_items;
}
