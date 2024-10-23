/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeductionStatusEnum, WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDeductionsMutation
// ====================================================

export interface UpdateDeductionsMutation_updateDeductions {
  __typename: "BulkUpdateResult";
  success: boolean | null;
}

export interface UpdateDeductionsMutation {
  updateDeductions: UpdateDeductionsMutation_updateDeductions;
}

export interface UpdateDeductionsMutationVariables {
  status?: DeductionStatusEnum | null;
  where: (WhereUniqueInputArgs | null)[];
}
