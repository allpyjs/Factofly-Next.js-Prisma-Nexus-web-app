/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerWhereInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: CustomerSelectFieldQuery
// ====================================================

export interface CustomerSelectFieldQuery_customers_nodes {
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

export interface CustomerSelectFieldQuery_customers {
  __typename: "CustomerConnection";
  /**
   * Flattened list of Customer type
   */
  nodes: CustomerSelectFieldQuery_customers_nodes[];
}

export interface CustomerSelectFieldQuery {
  customers: CustomerSelectFieldQuery_customers;
}

export interface CustomerSelectFieldQueryVariables {
  where?: CustomerWhereInputArgs | null;
}
