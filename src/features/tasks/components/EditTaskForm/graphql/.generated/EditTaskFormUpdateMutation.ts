/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskUpdateInputArgs, WhereUniqueInputArgs, TaskStatusEnum, CustomerTypeEnum, TaskPaymentTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: EditTaskFormUpdateMutation
// ====================================================

export interface EditTaskFormUpdateMutation_updateTask_customer_address {
  __typename: "Address";
  /**
   * Street address
   */
  address: string;
}

export interface EditTaskFormUpdateMutation_updateTask_customer {
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
  address: EditTaskFormUpdateMutation_updateTask_customer_address;
}

export interface EditTaskFormUpdateMutation_updateTask_jobType {
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

export interface EditTaskFormUpdateMutation_updateTask_user {
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

export interface EditTaskFormUpdateMutation_updateTask {
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
  customer: EditTaskFormUpdateMutation_updateTask_customer;
  /**
   * Job type of the task
   */
  jobType: EditTaskFormUpdateMutation_updateTask_jobType;
  /**
   * Owner of the task
   */
  user: EditTaskFormUpdateMutation_updateTask_user;
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

export interface EditTaskFormUpdateMutation {
  updateTask: EditTaskFormUpdateMutation_updateTask | null;
}

export interface EditTaskFormUpdateMutationVariables {
  input: TaskUpdateInputArgs;
  where: WhereUniqueInputArgs;
}
