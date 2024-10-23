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

  address?: string;
  city?: string;
  postalCode?: string;
  countryId?: bigint;
};

const toFormData = (input: UserType): AccountSetupFormData => ({
  id: input.id,

  address: input.address?.address,
  city: input.address?.city,
  postalCode: input.address?.postalCode,
  countryId: input.address?.countryId
});

const toInputArgs = (input: AccountSetupFormData): UserUpdateInputArgs => ({
  address: input.address,
  city: input.city,
  postalCode: input.postalCode,
  countryId: input.countryId
});

type AccountSetupFormOptions = {
  onCompleted: () => void;
};

const useAddressForm = (userId: bigint, { onCompleted }: AccountSetupFormOptions) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          address: yup.string().label(t('labels.address')).required(),
          city: yup.string().label(t('labels.city')).required(),
          postalCode: yup.string().label(t('labels.postalCode')).required(),
          countryId: yup.string().label(t('labels.country')).required()
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

export default useAddressForm;
