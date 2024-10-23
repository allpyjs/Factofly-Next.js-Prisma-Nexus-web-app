/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereUniqueInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: SendInvoiceMutation
// ====================================================

export interface SendInvoiceMutation_sendInvoice {
  __typename: "SuccessResult";
  id: any;
  success: boolean | null;
}

export interface SendInvoiceMutation {
  sendInvoice: SendInvoiceMutation_sendInvoice;
}

export interface SendInvoiceMutationVariables {
  where: WhereUniqueInputArgs;
}
