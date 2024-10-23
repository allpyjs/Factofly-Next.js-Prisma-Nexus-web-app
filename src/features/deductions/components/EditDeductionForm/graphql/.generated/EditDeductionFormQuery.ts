/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs, DeductionStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: EditDeductionFormQuery
// ====================================================

export interface EditDeductionFormQuery_deduction {
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
   * Url that the deduction image can be viewed at
   */
  imageUrl: string | null;
}

export interface EditDeductionFormQuery {
  deduction: EditDeductionFormQuery_deduction | null;
}

export interface EditDeductionFormQueryVariables {
  where: WhereUniqueInputArgs;
}
