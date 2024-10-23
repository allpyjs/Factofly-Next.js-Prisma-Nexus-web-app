/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuditWhereInputArgs, AuditOrderByInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: AuditCardQuery
// ====================================================

export interface AuditCardQuery_audits_nodes_user {
  __typename: "User";
  /**
   * Users displayable name, using first name, last name or email to create this
   */
  displayName: string;
}

export interface AuditCardQuery_audits_nodes {
  __typename: "Audit";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * When the node was created
   */
  createdDate: any;
  userId: any | null;
  /**
   * User who performed the action
   */
  user: AuditCardQuery_audits_nodes_user | null;
  recordId: any | null;
  recordType: string | null;
  event: string | null;
  value: string | null;
  updatedValue: string | null;
}

export interface AuditCardQuery_audits {
  __typename: "AuditConnection";
  /**
   * Flattened list of Audit type
   */
  nodes: AuditCardQuery_audits_nodes[];
}

export interface AuditCardQuery {
  audits: AuditCardQuery_audits;
}

export interface AuditCardQueryVariables {
  first: number;
  where?: AuditWhereInputArgs | null;
  orderBy?: AuditOrderByInputArgs | null;
}
