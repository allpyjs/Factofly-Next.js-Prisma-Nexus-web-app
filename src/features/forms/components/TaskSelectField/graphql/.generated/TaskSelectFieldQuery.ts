/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskWhereInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: TaskSelectFieldQuery
// ====================================================

export interface TaskSelectFieldQuery_tasks_nodes {
  __typename: "Task";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Short description of the job
   */
  title: string;
}

export interface TaskSelectFieldQuery_tasks {
  __typename: "TaskConnection";
  /**
   * Flattened list of Task type
   */
  nodes: TaskSelectFieldQuery_tasks_nodes[];
}

export interface TaskSelectFieldQuery {
  tasks: TaskSelectFieldQuery_tasks;
}

export interface TaskSelectFieldQueryVariables {
  where?: TaskWhereInputArgs | null;
}
