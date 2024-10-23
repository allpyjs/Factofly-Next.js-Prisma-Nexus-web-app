import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import DeleteCooperationAgreementMutation from './graphql/DeleteCooperationAgreementMutation.gql';

type DeleteCooperationAgreementHookArgs = {
  onCompleted?: Function;
};

export default function useDeleteCooperationAgreement({
  onCompleted
}: DeleteCooperationAgreementHookArgs = {}) {
  const { t } = useTranslation('cooperationAgreements');
  const { enqueueSnackbar } = useSnackbar();
  const [deleteMutation, { loading: deleting, error: deleteError }] = useMutation(
    DeleteCooperationAgreementMutation,
    {
      refetchQueries: ['CooperationAgreementsTableQuery'],
      onCompleted: () => {
        enqueueSnackbar(t('messages.deleted'), { variant: 'success' });
        if (onCompleted) onCompleted();
      },
      onError: () => enqueueSnackbar(t('errors.delete'), { variant: 'error' })
    }
  );

  const deleteCooperationAgreement = useCallback(
    (id: number) => {
      deleteMutation({
        variables: { where: { id } }
      });
    },
    [deleteMutation]
  );

  return {
    deleteCooperationAgreement,
    deleting,
    deleteError
  };
}
