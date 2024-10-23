/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SalaryUpdateInputArgs, WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSalaryMutation
// ====================================================

export interface UpdateSalaryMutation_updateSalary {
  __typename: "Salary";
  /**
   * When item were created
   */
  createdDate: any;
  /**
   * When item last were updated
   */
  updatedDate: any;
  paymentDate: any;
}

export interface UpdateSalaryMutation {
  updateSalary: UpdateSalaryMutation_updateSalary | null;
}

export interface UpdateSalaryMutationVariables {
  input: SalaryUpdateInputArgs;
  where: WhereUniqueInputArgs;
}
