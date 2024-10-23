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

export type ReferralFormData = {
  id: bigint;

  userSpecifiedReferral?: string;
  userSpecifiedReferralOther?: string;
};

const toFormData = (input: UserType): ReferralFormData => ({
  id: input.id,

  userSpecifiedReferral:
    input.userSpecifiedReferral && input.userSpecifiedReferral.startsWith('Other: ')
      ? 'Other'
      : input.userSpecifiedReferral ?? undefined,
  userSpecifiedReferralOther:
    input.userSpecifiedReferral && input.userSpecifiedReferral.startsWith('Other: ')
      ? input.userSpecifiedReferral.replace('Other: ', '')
      : undefined
});

const toInputArgs = (input: ReferralFormData): UserUpdateInputArgs => ({
  userSpecifiedReferral:
    input.userSpecifiedReferral === 'Other'
      ? `Other: ${input.userSpecifiedReferralOther}`
      : input.userSpecifiedReferral
});

type ReferralFormOptions = {
  onCompleted: () => void;
};

const useReferralSourceForm = (userId: bigint, { onCompleted }: ReferralFormOptions) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          userSpecifiedReferral: yup.string().label(t('labels.userSpecifiedReferral')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'users',
    parseMutationData: (formData: ReferralFormData) => ({
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

export default useReferralSourceForm;
