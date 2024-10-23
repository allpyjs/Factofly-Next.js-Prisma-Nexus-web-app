import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import DeleteTaskMutation from './graphql/DeleteTaskMutation.gql';

type DeleteTaskHookArgs = {
  onCompleted?: Function;
};

export default function useDeleteTask({ onCompleted }: DeleteTaskHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading: deleting, error: deleteError }] = useMutation(DeleteTaskMutation, {
    refetchQueries: ['TasksTableQuery'],
    onCompleted: () => {
      enqueueSnackbar('Task deleted', { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar('Error deleting task', { variant: 'error' })
  });

  const deleteTask = useCallback(
    (id: number) => {
      deleteMutation({
        variables: { where: { id } }
      });
    },
    [deleteMutation]
  );

  return {
    deleteTask,
    deleting,
    deleteError
  };
}
