/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteDeductionMutation
// ====================================================

export interface DeleteDeductionMutation_updateDeduction_user {
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

export interface DeleteDeductionMutation_updateDeduction {
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
  user: DeleteDeductionMutation_updateDeduction_user;
}

export interface DeleteDeductionMutation {
  updateDeduction: DeleteDeductionMutation_updateDeduction | null;
}

export interface DeleteDeductionMutationVariables {
  where: WhereUniqueInputArgs;
}
