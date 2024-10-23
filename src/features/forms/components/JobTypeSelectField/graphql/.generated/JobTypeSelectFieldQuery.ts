/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: JobTypeSelectFieldQuery
// ====================================================

export interface JobTypeSelectFieldQuery_jobTypes {
  __typename: "JobType";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Name of the job in English
   */
  name_en: string;
  /**
   * Name of the job in Danish
   */
  name_da: string;
}

export interface JobTypeSelectFieldQuery {
  /**
   * List all job types
   */
  jobTypes: JobTypeSelectFieldQuery_jobTypes[];
}
