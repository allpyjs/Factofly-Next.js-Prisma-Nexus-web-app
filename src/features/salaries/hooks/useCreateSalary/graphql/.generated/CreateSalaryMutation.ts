/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SalaryCreateInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSalaryMutation
// ====================================================

export interface CreateSalaryMutation_createSalary {
  __typename: "Salary";
  /**
   * Unique identifier for this type
   */
  id: any;
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

export interface CreateSalaryMutation {
  createSalary: CreateSalaryMutation_createSalary | null;
}

export interface CreateSalaryMutationVariables {
  input: SalaryCreateInputArgs;
}
