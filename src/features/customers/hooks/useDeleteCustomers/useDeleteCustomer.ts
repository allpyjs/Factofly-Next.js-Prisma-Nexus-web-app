import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import DeleteCustomerMutation from './graphql/DeleteCustomerMutation.gql';

type DeleteCustomerHookArgs = {
  onCompleted?: Function;
};

export default function useDeleteCustomer({ onCompleted }: DeleteCustomerHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading: deleting, error: deleteError }] = useMutation(DeleteCustomerMutation, {
    refetchQueries: ['CustomersTableQuery'],
    onCompleted: () => {
      enqueueSnackbar('Customer deleted', { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar('Error deleting customer', { variant: 'error' })
  });

  const deleteCustomer = useCallback(
    (id: number) => {
      deleteMutation({
        variables: { where: { id } }
      });
    },
    [deleteMutation]
  );

  return {
    deleteCustomer,
    deleting,
    deleteError
  };
}
