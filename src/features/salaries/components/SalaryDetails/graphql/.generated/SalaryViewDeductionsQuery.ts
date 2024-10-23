/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeductionWhereInputArgs, DeductionOrderByInputArgs, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SalaryViewDeductionsQuery
// ====================================================

export interface SalaryViewDeductionsQuery_items_edges_node {
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
   * Url that the deduction image can be viewed at
   */
  imageUrl: string | null;
}

export interface SalaryViewDeductionsQuery_items_edges {
  __typename: "DeductionEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: SalaryViewDeductionsQuery_items_edges_node;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Cursor
   */
  cursor: string;
}

export interface SalaryViewDeductionsQuery_items {
  __typename: "DeductionConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: SalaryViewDeductionsQuery_items_edges[];
}

export interface SalaryViewDeductionsQuery {
  items: SalaryViewDeductionsQuery_items;
}

export interface SalaryViewDeductionsQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: DeductionWhereInputArgs | null;
  orderBy?: DeductionOrderByInputArgs | null;
}
