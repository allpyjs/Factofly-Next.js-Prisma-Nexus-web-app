import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import SendInvoiceMutation from './graphql/SendInvoiceMutation.gql';

type SendInvoiceHookArgs = {
  onCompleted?: Function;
};

export default function useSendInvoice({ onCompleted }: SendInvoiceHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('invoices');
  const [sendMutation, { loading: updating, error: updateError }] = useMutation(SendInvoiceMutation, {
    refetchQueries: ['InvoicesTableQuery', 'SalaryViewQuery'],
    onCompleted: () => {
      enqueueSnackbar(t('messages.updated'), { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
  });

  const sendInvoice = useCallback(
    (id: number) => {
      sendMutation({
        variables: { where: { id } }
      });
    },
    [sendMutation]
  );

  return {
    sendInvoice,
    updating,
    updateError
  };
}
