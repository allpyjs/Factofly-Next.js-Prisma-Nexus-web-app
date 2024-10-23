/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferralWhereInputArgs, ReferralOrderByInputArgs, ReferralStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: ReferralsTableQuery
// ====================================================

export interface ReferralsTableQuery_items_edges_node_user {
  __typename: "User";
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
  /**
   * Unique identifier for this type
   */
  id: any;
}

export interface ReferralsTableQuery_items_edges_node_referredUser {
  __typename: "User";
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
  /**
   * Unique identifier for this type
   */
  id: any;
}

export interface ReferralsTableQuery_items_edges_node {
  __typename: "Referral";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * The recipient email address
   */
  email: string;
  /**
   * Status enum
   */
  status: ReferralStatusEnum;
  /**
   * Owner of the task
   */
  user: ReferralsTableQuery_items_edges_node_user;
  /**
   * User referred with this referral
   */
  referredUser: ReferralsTableQuery_items_edges_node_referredUser;
}

export interface ReferralsTableQuery_items_edges {
  __typename: "ReferralEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ReferralsTableQuery_items_edges_node;
}

export interface ReferralsTableQuery_items {
  __typename: "ReferralConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: ReferralsTableQuery_items_edges[];
}

export interface ReferralsTableQuery {
  items: ReferralsTableQuery_items;
}

export interface ReferralsTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: ReferralWhereInputArgs | null;
  orderBy?: ReferralOrderByInputArgs | null;
}
