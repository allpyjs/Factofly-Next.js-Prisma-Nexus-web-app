/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeductionStatusEnum } from "./../../../../.generated/globalTypes";

// ====================================================
// GraphQL fragment: DeductionFragment
// ====================================================

export interface DeductionFragment_user {
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

export interface DeductionFragment {
  __typename: "Deduction";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Status enum
   */
  status: DeductionStatusEnum;
  active: boolean;
  /**
   * Short description of the deduction
   */
  description: string;
  /**
   * When item were created
   */
  createdDate: any;
  /**
   * When item last were updated
   */
  updatedDate: any;
  /**
   * Total amount of the deduction
   */
  total: any | null;
  /**
   * Total amount of the deduction in Danish Krone
   */
  totalDkk: any | null;
  /**
   * Whether the deduction includes VAT or not
   */
  includeVat: boolean | null;
  /**
   * Currency that the deduction is in
   */
  currency: string | null;
  /**
   * Owner of the deduction
   */
  user: DeductionFragment_user;
}
