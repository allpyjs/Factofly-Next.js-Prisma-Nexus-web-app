import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { UserUpdateInputArgs } from '~/.generated/globalTypes';

import UpdateUserMutation from './graphql/UpdateUserMutation.gql';

type UpdateUserHookArgs = {
  onCompleted?: Function;
};

export default function useUpdateUser({ onCompleted }: UpdateUserHookArgs = {}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('users');
  const [updateMutation, { loading: updating, error: updateError }] = useMutation(UpdateUserMutation, {
    refetchQueries: [],
    onCompleted: () => {
      enqueueSnackbar(t('messages.updated'), { variant: 'success' });
      if (onCompleted) onCompleted();
    },
    onError: () => enqueueSnackbar(t('errors.update'), { variant: 'error' })
  });

  const updateUser = useCallback(
    (id: number, data: UserUpdateInputArgs) => {
      updateMutation({
        variables: { input: data, where: { id } }
      });
    },
    [updateMutation]
  );

  return {
    updateUser,
    updating,
    updateError
  };
}
