/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL fragment: DeductionListItem
// ====================================================

export interface DeductionListItem_items_edges_node_user {
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

export interface DeductionListItem_items_edges_node {
  __typename: "Deduction";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Status enum
   */
  status: DeductionStatusEnum;
  active: boolean;
  /**
   * Short description of the deduction
   */
  description: string;
  /**
   * When item were created
   */
  createdDate: any;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * Total amount of the deduction
   */
  total: any | null;
  /**
   * Total amount of the deduction in Danish Krone
   */
  totalDkk: any | null;
  /**
   * Whether the deduction includes VAT or not
   */
  includeVat: boolean | null;
  /**
   * Currency that the deduction is in
   */
  currency: string | null;
  /**
   * Owner of the deduction
   */
  user: DeductionListItem_items_edges_node_user;
}

export interface DeductionListItem_items_edges {
  __typename: "DeductionEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: DeductionListItem_items_edges_node;
}

export interface DeductionListItem_items {
  __typename: "DeductionConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: DeductionListItem_items_edges[];
}

export interface DeductionListItem {
  __typename: "Query";
  items: DeductionListItem_items;
}
