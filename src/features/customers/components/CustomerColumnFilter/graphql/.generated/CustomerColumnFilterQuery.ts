/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerWhereInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: CustomerColumnFilterQuery
// ====================================================

export interface CustomerColumnFilterQuery_customers_nodes {
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

export interface CustomerColumnFilterQuery_customers {
  __typename: "CustomerConnection";
  /**
   * Flattened list of Customer type
   */
  nodes: CustomerColumnFilterQuery_customers_nodes[];
}

export interface CustomerColumnFilterQuery {
  customers: CustomerColumnFilterQuery_customers;
}

export interface CustomerColumnFilterQueryVariables {
  where?: CustomerWhereInputArgs | null;
}
