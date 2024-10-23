/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: FetchPayrollMutation
// ====================================================

export interface FetchPayrollMutation_fetchPayroll {
  __typename: "SuccessResult";
  id: any;
  success: boolean | null;
}

export interface FetchPayrollMutation {
  fetchPayroll: FetchPayrollMutation_fetchPayroll;
}

export interface FetchPayrollMutationVariables {
  where: WhereUniqueInputArgs;
}
