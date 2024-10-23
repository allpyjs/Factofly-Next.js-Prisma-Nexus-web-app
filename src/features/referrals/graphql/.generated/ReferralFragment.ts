/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferralStatusEnum } from "./../../../../.generated/globalTypes";

// ====================================================
// GraphQL fragment: ReferralFragment
// ====================================================

export interface ReferralFragment_user {
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

export interface ReferralFragment_referredUser {
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

export interface ReferralFragment {
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
  user: ReferralFragment_user;
  /**
   * User referred with this referral
   */
  referredUser: ReferralFragment_referredUser;
}
