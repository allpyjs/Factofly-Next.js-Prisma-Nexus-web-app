import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import AccountSetupFormUpdateMutation from '../graphql/AccountSetupFormUpdateMutation.gql';
import { AccountSetupFormUpdateMutation as AccountSetupFormUpdateMutationType } from '../graphql/.generated/AccountSetupFormUpdateMutation';
import AccountSetupFormQuery from '../graphql/AccountSetupFormQuery.gql';
import {
  AccountSetupFormQuery as AccountSetupFormQueryType,
  AccountSetupFormQuery_me as UserType
} from '../graphql/.generated/AccountSetupFormQuery';
import { UserUpdateInputArgs } from '~/.generated/globalTypes';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type SituationFormData = {
  id: bigint;

  freelancerSituation?: string;
};

const toFormData = (input: UserType): SituationFormData => ({
  id: input.id,

  freelancerSituation: input.freelancerSituation ?? undefined
});

const toInputArgs = (input: SituationFormData): UserUpdateInputArgs => ({
  freelancerSituation: input.freelancerSituation
});

type SituationFormOptions = {
  onCompleted: () => void;
};

const useSituationForm = (userId: bigint, { onCompleted }: SituationFormOptions) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          freelancerSituation: yup.string().nullable().label(t('labels.freelancerSituation')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'users',
    parseMutationData: (formData: SituationFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: userId } }
    }),
    parseLoadFormData: (initialData: AccountSetupFormQueryType) => toFormData(initialData.me!),
    parseUpdateFormData: (updatedData: AccountSetupFormUpdateMutationType) =>
      toFormData(updatedData.updateUser!),
    createMutation: AccountSetupFormUpdateMutation,
    query: AccountSetupFormQuery,
    onCompleted,
    showSuccessNotification: false
  });
};

export default useSituationForm;
