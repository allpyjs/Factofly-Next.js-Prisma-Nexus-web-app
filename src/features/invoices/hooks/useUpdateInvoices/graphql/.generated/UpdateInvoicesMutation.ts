/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceBulkUpdateInputArgs } from "./../../../../../../.generated/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInvoicesMutation
// ====================================================

export interface UpdateInvoicesMutation_updateInvoices {
  __typename: "BulkUpdateResult";
  success: boolean | null;
}

export interface UpdateInvoicesMutation {
  updateInvoices: UpdateInvoicesMutation_updateInvoices;
}

export interface UpdateInvoicesMutationVariables {
  data: (InvoiceBulkUpdateInputArgs | null)[];
}
