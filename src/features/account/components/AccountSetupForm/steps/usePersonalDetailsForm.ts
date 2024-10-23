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

export type AccountSetupFormData = {
  id: bigint;

  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  jobTypeId?: bigint;
  language?: string;
};

const toFormData = (input: UserType): AccountSetupFormData => ({
  id: input.id,

  firstName: input.firstName ?? undefined,
  lastName: input.lastName ?? undefined,
  phoneNumber: input.phoneNumber ?? undefined,
  jobTypeId: input.jobType?.id,
  language: input.language
});

const toInputArgs = (input: AccountSetupFormData): UserUpdateInputArgs => ({
  firstName: input.firstName!,
  lastName: input.lastName!,
  phoneNumber: input.phoneNumber,
  jobType: input.jobTypeId ? { connect: { id: input.jobTypeId } } : undefined,
  language: input.language!
});

type AccountSetupFormOptions = {
  onCompleted: () => void;
};

const usePersonalDetailsForm = (userId: bigint, { onCompleted }: AccountSetupFormOptions) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          firstName: yup.string().label(t('labels.firstName')).required(),
          lastName: yup.string().label(t('labels.firstName')).required(),
          phoneNumber: yup.string().label(t('labels.phoneNumber')).required(),
          jobTypeId: yup.number().label(t('labels.jobType')).required(),
          language: yup.string().label(t('labels.language')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'users',
    parseMutationData: (formData: AccountSetupFormData) => ({
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

export default usePersonalDetailsForm;
