/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceUpdateInputArgs, WhereUniqueInputArgs, InvoiceStatusEnum } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInvoiceStatusMutation
// ====================================================

export interface UpdateInvoiceStatusMutation_updateInvoice {
  __typename: "Invoice";
  /**
   * Unique identifier for this type
   */
  id: any;
  /**
   * Status enum
   */
  status: InvoiceStatusEnum;
}

export interface UpdateInvoiceStatusMutation {
  updateInvoice: UpdateInvoiceStatusMutation_updateInvoice;
}

export interface UpdateInvoiceStatusMutationVariables {
  data: InvoiceUpdateInputArgs;
  where: WhereUniqueInputArgs;
}
