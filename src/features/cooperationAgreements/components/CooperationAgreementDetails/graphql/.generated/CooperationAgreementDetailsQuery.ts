/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL query operation: CooperationAgreementDetailsQuery
// ====================================================

export interface CooperationAgreementDetailsQuery_cooperationAgreement_customer {
  __typename: "Customer";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Customer name
   */
  name: string;
}

export interface CooperationAgreementDetailsQuery_cooperationAgreement_user {
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

export interface CooperationAgreementDetailsQuery_cooperationAgreement {
  __typename: "CooperationAgreement";
  /**
   * Unique identifier for this type
   */
  id: any;
  active: boolean;
  startDate: any;
  endDate: any | null;
  openEnded: boolean;
  customerId: any;
  /**
   * Linked customer
   */
  customer: CooperationAgreementDetailsQuery_cooperationAgreement_customer;
  terminationAgreement: string;
  taskDescription: string;
  extraWork: boolean;
  extraWorkNotification: string | null;
  extraWorkNotificationOther: string | null;
  equipmentDetails: string | null;
  equipmentSupplied: boolean | null;
  specialConditions: string | null;
  paymentType: string;
  paymentTerm: string;
  paymentTermOther: string | null;
  paymentTermDays: number;
  paymentTermSpecial: string | null;
  /**
   * When the node was created
   */
  createdDate: any;
  /**
   * When the node was last updated
   */
  updatedDate: any;
  /**
   * Owner of the item
   */
  user: CooperationAgreementDetailsQuery_cooperationAgreement_user;
}

export interface CooperationAgreementDetailsQuery {
  cooperationAgreement: CooperationAgreementDetailsQuery_cooperationAgreement | null;
}

export interface CooperationAgreementDetailsQueryVariables {
  where: WhereUniqueInputArgs;
}
