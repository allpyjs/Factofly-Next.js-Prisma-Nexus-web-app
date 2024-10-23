/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs, TaskStatusEnum, CustomerTypeEnum, TaskPaymentTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteTaskMutation
// ====================================================

export interface DeleteTaskMutation_updateTask_customer_address {
  __typename: "Address";
  /**
   * Street address
   */
  address: string;
}

export interface DeleteTaskMutation_updateTask_customer {
  __typename: "Customer";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Customer name
   */
  name: string;
  /**
   * Customer email
   */
  email: string;
  /**
   * Type of customer
   */
  type: CustomerTypeEnum;
  /**
   * Customer address
   */
  address: DeleteTaskMutation_updateTask_customer_address;
}

export interface DeleteTaskMutation_updateTask_jobType {
  __typename: "JobType";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Name of the job in English
   */
  name_en: string;
}

export interface DeleteTaskMutation_updateTask_user {
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

export interface DeleteTaskMutation_updateTask {
  __typename: "Task";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Status enum
   */
  status: TaskStatusEnum;
  /**
   * Short description of the job
   */
  title: string;
  /**
   * Reference field
   */
  reference: string | null;
  /**
   * Customer related to this task
   */
  customer: DeleteTaskMutation_updateTask_customer;
  /**
   * Job type of the task
   */
  jobType: DeleteTaskMutation_updateTask_jobType;
  /**
   * Owner of the task
   */
  user: DeleteTaskMutation_updateTask_user;
  /**
   * Date when the work is estimated to start from
   */
  startDate: any;
  /**
   * Date when the work is estimated to end at
   */
  endDate: any;
  /**
   * How many hours are expected in this task
   */
  expectedHours: number;
  /**
   * Task terms are accepted
   */
  termsAccepted: boolean;
  /**
   * Description of the task
   */
  description: string | null;
  /**
   * How payment for the task is calculated
   */
  paymentType: TaskPaymentTypeEnum | null;
  /**
   * Amount that the user should receive
   */
  paymentAmount: any | null;
}

export interface DeleteTaskMutation {
  updateTask: DeleteTaskMutation_updateTask | null;
}

export interface DeleteTaskMutationVariables {
  where: WhereUniqueInputArgs;
}
