/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ServiceLogWhereInputArgs, ServiceLogOrderByInputArgs, RecordTypeEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: ServiceLogCardQuery
// ====================================================

export interface ServiceLogCardQuery_serviceLogs_nodes {
  __typename: "ServiceLog";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * When the node was created
   */
  createdDate: any;
  recordId: any | null;
  recordType: RecordTypeEnum | null;
  service: string | null;
  status: string | null;
  message: string | null;
}

export interface ServiceLogCardQuery_serviceLogs {
  __typename: "ServiceLogConnection";
  /**
   * Flattened list of ServiceLog type
   */
  nodes: ServiceLogCardQuery_serviceLogs_nodes[];
}

export interface ServiceLogCardQuery {
  serviceLogs: ServiceLogCardQuery_serviceLogs;
}

export interface ServiceLogCardQueryVariables {
  first: number;
  where?: ServiceLogWhereInputArgs | null;
  orderBy?: ServiceLogOrderByInputArgs | null;
}
