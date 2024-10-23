import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import FetchPayrollMutation from './graphql/FetchPayrollMutation.gql';

type FetchPayrollHookArgs = {
  onCompleted?: Function;
};

export default function useFetchPayroll({ onCompleted }: FetchPayrollHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('salaries');
  const [sendMutation, { loading: updating, error: updateError }] = useMutation(FetchPayrollMutation, {
    refetchQueries: ['SalariesTableQuery', 'SalaryCompleteViewQuery'],
    onCompleted: () => {
      enqueueSnackbar(t('messages.updated'), { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
  });

  const fetchPayroll = useCallback(
    (id: number) => {
      sendMutation({
        variables: { where: { id } }
      });
    },
    [sendMutation]
  );

  return {
    fetchPayroll,
    updating,
    updateError
  };
}
