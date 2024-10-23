import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { DeductionStatusEnum } from '~/.generated/globalTypes';

import UpdateDeductionsMutation from './graphql/UpdateDeductionsMutation.gql';

type UpdateDeductionsHookArgs = {
  onCompleted?: Function;
};

export default function useUpdateDeductions({ onCompleted }: UpdateDeductionsHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('deductions');
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(UpdateDeductionsMutation, {
    refetchQueries: ['DeductionsTableQuery', 'SalaryViewDeductionsQuery'],
    onCompleted: () => {
      enqueueSnackbar(t('messages.updated'), { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
  });

  const updateDeductions = useCallback(
    (ids: number[], status: DeductionStatusEnum) => {
      updateMutation({
        variables: { status, where: ids.map((id) => ({ id })) }
      });
    },
    [updateMutation]
  );

  return {
    updateDeductions,
    updating,
    updateError
  };
}
