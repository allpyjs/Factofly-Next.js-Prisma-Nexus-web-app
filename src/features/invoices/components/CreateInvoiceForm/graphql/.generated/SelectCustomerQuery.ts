/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SelectCustomerQuery
// ====================================================

export interface SelectCustomerQuery_customer {
  __typename: "Customer";
  /**
   * Customer contact person
   */
  contact: string;
  /**
   * Customer default due days
   */
  paymentDueDays: number | null;
  /**
   * Customer email
   */
  email: string;
  /**
   * Whether early payment is allowed for this customer
   */
  allowEarlyPayment: boolean | null;
}

export interface SelectCustomerQuery {
  customer: SelectCustomerQuery_customer | null;
}

export interface SelectCustomerQueryVariables {
  where: WhereUniqueInputArgs;
}
