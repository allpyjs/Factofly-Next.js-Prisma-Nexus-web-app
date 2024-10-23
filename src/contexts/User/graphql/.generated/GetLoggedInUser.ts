/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RoleEnum } from "./../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: GetLoggedInUser
// ====================================================

export interface GetLoggedInUser_me {
  __typename: "User";
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
  role: RoleEnum;
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * User language
   */
  language: string;
  /**
   * User locale
   */
  locale: string | null;
  /**
   * Is user email verified
   */
  emailVerified: boolean;
  /**
   * A shareable code for referring other users to the system
   */
  referralLinkCode: string | null;
  features: any | null;
  availableCredits: number | null;
  /**
   * Whether the user has completed the account setup
   */
  accountSetupComplete: boolean | null;
  /**
   * User phone number
   */
  phoneNumber: string | null;
  /**
   * Referral string - where user signed up from
   */
  referral: string | null;
  /**
   * Whether this user is setting some money aside for the vacation payment
   */
  vacationPayment: boolean;
}

export interface GetLoggedInUser {
  me: GetLoggedInUser_me;
}
