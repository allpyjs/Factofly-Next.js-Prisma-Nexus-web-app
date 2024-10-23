import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import DeleteDeductionMutation from './graphql/DeleteDeductionMutation.gql';

type DeleteDeductionHookArgs = {
  onCompleted?: Function;
};

export default function useDeleteDeduction({ onCompleted }: DeleteDeductionHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading: deleting, error: deleteError }] = useMutation(DeleteDeductionMutation, {
    refetchQueries: ['DeductionsTableQuery'],
    onCompleted: () => {
      enqueueSnackbar('Deduction deleted', { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar('Error deleting deduction', { variant: 'error' })
  });

  const deleteDeduction = useCallback(
    (id: number) => {
      deleteMutation({
        variables: { where: { id } }
      });
    },
    [deleteMutation]
  );

  return {
    deleteDeduction,
    deleting,
    deleteError
  };
}
