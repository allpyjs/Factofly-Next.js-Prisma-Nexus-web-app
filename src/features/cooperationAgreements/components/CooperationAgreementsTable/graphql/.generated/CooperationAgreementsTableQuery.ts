/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CooperationAgreementWhereInputArgs, CooperationAgreementOrderByInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: CooperationAgreementsTableQuery
// ====================================================

export interface CooperationAgreementsTableQuery_items_edges_node_customer {
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

export interface CooperationAgreementsTableQuery_items_edges_node_user {
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

export interface CooperationAgreementsTableQuery_items_edges_node {
  __typename: "CooperationAgreement";
  /**
   * Unique identifier for this type
   */
  id: any;
  active: boolean;
  startDate: any;
  endDate: any | null;
  openEnded: boolean;
  customerId: any;
  /**
   * Linked customer
   */
  customer: CooperationAgreementsTableQuery_items_edges_node_customer;
  terminationAgreement: string;
  taskDescription: string;
  extraWork: boolean;
  extraWorkNotification: string | null;
  extraWorkNotificationOther: string | null;
  equipmentDetails: string | null;
  equipmentSupplied: boolean | null;
  specialConditions: string | null;
  paymentType: string;
  paymentTerm: string;
  paymentTermOther: string | null;
  paymentTermDays: number;
  paymentTermSpecial: string | null;
  /**
   * When the node was created
   */
  createdDate: any;
  /**
   * When the node was last updated
   */
  updatedDate: any;
  /**
   * Owner of the item
   */
  user: CooperationAgreementsTableQuery_items_edges_node_user;
}

export interface CooperationAgreementsTableQuery_items_edges {
  __typename: "CooperationAgreementEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: CooperationAgreementsTableQuery_items_edges_node;
}

export interface CooperationAgreementsTableQuery_items {
  __typename: "CooperationAgreementConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: CooperationAgreementsTableQuery_items_edges[];
}

export interface CooperationAgreementsTableQuery {
  __typename: "Query";
  items: CooperationAgreementsTableQuery_items;
}

export interface CooperationAgreementsTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: CooperationAgreementWhereInputArgs | null;
  orderBy?: CooperationAgreementOrderByInputArgs | null;
}
