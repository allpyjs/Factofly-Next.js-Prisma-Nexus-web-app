/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereInputArgs, UserOrderByInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: UsersTableQuery
// ====================================================

export interface UsersTableQuery_items_edges_node_jobType {
  __typename: "JobType";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Name of the job in English
   */
  name_en: string;
}

export interface UsersTableQuery_items_edges_node {
  __typename: "User";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * User first name
   */
  firstName: string | null;
  /**
   * User last name
   */
  lastName: string | null;
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User phone number
   */
  phoneNumber: string | null;
  /**
   * Default job type
   */
  jobType: UsersTableQuery_items_edges_node_jobType | null;
  /**
   * Default user unit
   */
  unit: string | null;
  /**
   * Default user currency
   */
  currency: string | null;
  /**
   * User language
   */
  language: string;
  /**
   * Referral string - where user signed up from
   */
  referral: string | null;
  /**
   * When the node was created
   */
  createdDate: any;
  /**
   * When the node was last updated
   */
  updatedDate: any;
  /**
   * Where the user says they heard about Factofly from
   */
  userSpecifiedReferral: string | null;
  /**
   * What work situation the freelancer is currently in
   */
  freelancerSituation: string | null;
  /**
   * Last time user were active
   */
  lastActive: any | null;
}

export interface UsersTableQuery_items_edges {
  __typename: "UserEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: UsersTableQuery_items_edges_node;
}

export interface UsersTableQuery_items {
  __typename: "UserConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: UsersTableQuery_items_edges[];
}

export interface UsersTableQuery {
  items: UsersTableQuery_items;
}

export interface UsersTableQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: UserWhereInputArgs | null;
  orderBy?: UserOrderByInputArgs | null;
}
