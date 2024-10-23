/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: UserSelectFieldQuery
// ====================================================

export interface UserSelectFieldQuery_users_nodes {
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

export interface UserSelectFieldQuery_users {
  __typename: "UserConnection";
  /**
   * Flattened list of User type
   */
  nodes: UserSelectFieldQuery_users_nodes[];
}

export interface UserSelectFieldQuery {
  users: UserSelectFieldQuery_users;
}

export interface UserSelectFieldQueryVariables {
  where?: UserWhereInputArgs | null;
}
