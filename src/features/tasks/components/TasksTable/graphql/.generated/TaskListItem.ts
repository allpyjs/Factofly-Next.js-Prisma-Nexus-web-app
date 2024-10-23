/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatusEnum, CustomerTypeEnum, TaskPaymentTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL fragment: TaskListItem
// ====================================================

export interface TaskListItem_items_edges_node_customer_address {
  __typename: "Address";
  /**
   * Street address
   */
  address: string;
}

export interface TaskListItem_items_edges_node_customer {
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
  address: TaskListItem_items_edges_node_customer_address;
}

export interface TaskListItem_items_edges_node_jobType {
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

export interface TaskListItem_items_edges_node_user {
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

export interface TaskListItem_items_edges_node {
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
  customer: TaskListItem_items_edges_node_customer;
  /**
   * Job type of the task
   */
  jobType: TaskListItem_items_edges_node_jobType;
  /**
   * Owner of the task
   */
  user: TaskListItem_items_edges_node_user;
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

export interface TaskListItem_items_edges {
  __typename: "TaskEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: TaskListItem_items_edges_node;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Cursor
   */
  cursor: string;
}

export interface TaskListItem_items {
  __typename: "TaskConnection";
  totalCount: number;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: TaskListItem_items_edges[];
}

export interface TaskListItem {
  __typename: "Query";
  items: TaskListItem_items;
}
