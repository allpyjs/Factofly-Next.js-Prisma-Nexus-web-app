/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: SelectTaskQuery
// ====================================================

export interface SelectTaskQuery_task {
  __typename: "Task";
  /**
   * Date when the work is estimated to start from
   */
  startDate: any;
  /**
   * Date when the work is estimated to end at
   */
  endDate: any;
  /**
   * Id of customer
   */
  customerId: any;
  /**
   * How many hours are expected in this task
   */
  expectedHours: number;
}

export interface SelectTaskQuery {
  task: SelectTaskQuery_task | null;
}

export interface SelectTaskQueryVariables {
  where: WhereUniqueInputArgs;
}
