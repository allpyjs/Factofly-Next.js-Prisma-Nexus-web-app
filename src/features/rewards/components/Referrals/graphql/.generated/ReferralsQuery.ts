/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferralWhereInputArgs, ReferralOrderByInputArgs, ReferralStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: ReferralsQuery
// ====================================================

export interface ReferralsQuery_items_edges_node {
  __typename: "Referral";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * When the node was created
   */
  createdDate: any;
  /**
   * When the node was last updated
   */
  updatedDate: any;
  /**
   * The recipient email address
   */
  email: string;
  /**
   * Status enum
   */
  status: ReferralStatusEnum;
}

export interface ReferralsQuery_items_edges {
  __typename: "ReferralEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ReferralsQuery_items_edges_node;
}

export interface ReferralsQuery_items {
  __typename: "ReferralConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: ReferralsQuery_items_edges[];
}

export interface ReferralsQuery_earned {
  __typename: "ReferralConnection";
  totalCount: number;
}

export interface ReferralsQuery {
  items: ReferralsQuery_items;
  earned: ReferralsQuery_earned;
}

export interface ReferralsQueryVariables {
  first: number;
  cursor?: string | null;
  skip?: number | null;
  where?: ReferralWhereInputArgs | null;
  earned?: ReferralWhereInputArgs | null;
  orderBy?: ReferralOrderByInputArgs | null;
}
