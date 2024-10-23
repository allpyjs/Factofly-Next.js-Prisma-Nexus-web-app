/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferralCreateInputArgs, ReferralStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferralFormMutation
// ====================================================

export interface CreateReferralFormMutation_createReferral {
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

export interface CreateReferralFormMutation {
  createReferral: CreateReferralFormMutation_createReferral | null;
}

export interface CreateReferralFormMutationVariables {
  input: ReferralCreateInputArgs;
}
