import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import convertNumber from '~/utils/convertNumber';

import UpdateInvoiceStatusMutation from './graphql/UpdateInvoiceStatusMutation.gql';

type UpdateInvoicesHookArgs = {
  onCompleted?: Function;
};

export default function useUpdateInvoiceStatus({ onCompleted }: UpdateInvoicesHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('invoices');
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(
    UpdateInvoiceStatusMutation,
    {
      refetchQueries: ['InvoicesTableQuery', 'SalaryViewQuery', 'InvoiceDetailsQuery'],
      onCompleted: () => {
        enqueueSnackbar(t('messages.updated'), { variant: 'success' });
        if (onCompleted) onCompleted();
      },
      onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
    }
  );

  const updateInvoiceStatus = useCallback(
    (id: number, status: InvoiceStatusEnum, paidAmountDkk?: string | number) => {
      updateMutation({
        variables: { data: { status, paidAmountDkk: convertNumber(paidAmountDkk) }, where: { id } }
      });
    },
    [updateMutation]
  );

  return {
    updateInvoiceStatus,
    updating,
    updateError
  };
}
