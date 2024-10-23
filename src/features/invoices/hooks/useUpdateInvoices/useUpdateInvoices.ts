import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';

import UpdateInvoicesMutation from './graphql/UpdateInvoicesMutation.gql';

type UpdateInvoicesHookArgs = {
  onCompleted?: Function;
};

type UpdateInvoicesData = {
  where: { id: number };
  data: { status: InvoiceStatusEnum; paidAmountDkk?: number };
}[];

export default function useUpdateInvoices({ onCompleted }: UpdateInvoicesHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('invoices');
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(UpdateInvoicesMutation, {
    refetchQueries: ['InvoicesTableQuery', 'SalaryViewQuery'],
    onCompleted: () => {
      enqueueSnackbar(t('messages.updated'), { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
  });

  const updateInvoices = useCallback(
    (data: UpdateInvoicesData) => {
      updateMutation({
        variables: { data }
      });
    },
    [updateMutation]
  );

  return {
    updateInvoices,
    updating,
    updateError
  };
}
