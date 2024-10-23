import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditInvoiceFormUpdateMutation from './graphql/EditInvoiceFormUpdateMutation.gql';
import { EditInvoiceFormUpdateMutation as EditInvoiceFormUpdateMutationType } from './graphql/.generated/EditInvoiceFormUpdateMutation';
import EditInvoiceFormQuery from './graphql/EditInvoiceFormQuery.gql';
import { InvoiceStatusEnum, InvoiceUpdateInputArgs } from '~/.generated/globalTypes';
import {
  EditInvoiceFormQuery as EditInvoiceFormQueryType,
  EditInvoiceFormQuery_invoice as InvoiceType
} from './graphql/.generated/EditInvoiceFormQuery';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditInvoiceStatusFormData = {
  id: bigint;
  status: InvoiceStatusEnum;
};

export const toFormData = (input: InvoiceType): EditInvoiceStatusFormData => ({
  id: input.id,
  status: input.status
});

export const toInputArgs = (input: EditInvoiceStatusFormData): InvoiceUpdateInputArgs => ({
  status: input.status
});

const useEditInvoiceStatusForm = (invoiceId: number) => {
  const { t } = useTranslation('invoices');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          status: yup.string().label(t('labels.status')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'invoices',
    parseMutationData: (formData: EditInvoiceStatusFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: invoiceId } }
    }),
    parseLoadFormData: (initialData: EditInvoiceFormQueryType) => toFormData(initialData.invoice!),
    parseUpdateFormData: (updatedData: EditInvoiceFormUpdateMutationType) =>
      toFormData(updatedData.updateInvoice!),
    createMutation: EditInvoiceFormUpdateMutation,
    query: EditInvoiceFormQuery,
    queryOptions: {
      variables: {
        where: { id: invoiceId }
      }
    }
  });
};

export default useEditInvoiceStatusForm;
