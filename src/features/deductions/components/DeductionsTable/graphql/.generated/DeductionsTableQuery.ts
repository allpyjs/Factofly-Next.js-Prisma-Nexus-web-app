/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeductionWhereInputArgs, DeductionOrderByInputArgs, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: DeductionsTableQuery
// ====================================================

export interface DeductionsTableQuery_items_edges_node_user {
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

export interface DeductionsTableQuery_items_edges_node {
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
  user: DeductionsTableQuery_items_edges_node_user;
}

export interface DeductionsTableQuery_items_edges {
  __typename: "DeductionEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: DeductionsTableQuery_items_edges_node;
}

export interface DeductionsTableQuery_items {
  __typename: "DeductionConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: DeductionsTableQuery_items_edges[];
}

export interface DeductionsTableQuery {
  __typename: "Query";
  items: DeductionsTableQuery_items;
}

export interface DeductionsTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: DeductionWhereInputArgs | null;
  orderBy?: DeductionOrderByInputArgs | null;
}
