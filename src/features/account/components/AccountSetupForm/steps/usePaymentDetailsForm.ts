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
import { TaxCardEnum, UserUpdateInputArgs } from '~/.generated/globalTypes';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type AccountSetupFormData = {
  id: bigint;

  hasBankDetails: boolean;

  bankNameHidden?: string;
  bankAccountHidden?: string;
  bankRegistrationHidden?: string;

  hasTaxInfo: boolean;

  personIdHidden?: string;
  taxCardHidden?: string;

  bankNameNew?: string;
  bankAccountNew?: string;
  bankRegistrationNew?: string;

  personIdNew?: string;
  taxCardNew?: TaxCardEnum;
};

const toFormData = (input: UserType): AccountSetupFormData => ({
  id: input.id,

  bankNameHidden: input.bankAccountHidden?.bankName ?? undefined,
  bankAccountHidden: input.bankAccountHidden?.bankAccount ?? undefined,
  bankRegistrationHidden: input.bankAccountHidden?.bankRegistration ?? undefined,

  hasBankDetails:
    !!input.bankAccountHidden?.bankName &&
    !!input.bankAccountHidden?.bankAccount &&
    !!input.bankAccountHidden?.bankRegistration,

  personIdHidden: input.taxInfoHidden?.personId ?? undefined,
  taxCardHidden: input.taxInfoHidden?.taxCard ?? undefined,

  hasTaxInfo: !!input.taxInfoHidden?.personId && !!input.taxInfoHidden?.taxCard
});

const toInputArgs = (input: AccountSetupFormData): UserUpdateInputArgs => ({
  bankName: input.bankNameNew ?? undefined,
  bankAccount: input.bankAccountNew ?? undefined,
  bankRegistration: input.bankRegistrationNew ?? undefined,

  personId: input.personIdNew ?? undefined,
  taxCard: input.taxCardNew ?? undefined
});

type AccountSetupFormOptions = {
  onCompleted: () => void;
};

const usePaymentDetailsForm = (userId: bigint, { onCompleted }: AccountSetupFormOptions) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          bankNameNew: yup.string().label(t('labels.bankName')).when('hasBankDetails', {
            is: false,
            then: yup.string().required()
          }),
          bankAccountNew: yup.string().label(t('labels.bankAccount')).when('hasBankDetails', {
            is: false,
            then: yup.string().required()
          }),
          bankRegistrationNew: yup.string().label(t('labels.bankRegistration')).when('hasBankDetails', {
            is: false,
            then: yup.string().required()
          }),

          personIdNew: yup.string().label(t('labels.personId.dk')).when('hasTaxInfo', {
            is: false,
            then: yup.string().required()
          }),
          taxCardNew: yup.string().label(t('labels.taxCard')).when('hasTaxInfo', {
            is: false,
            then: yup.string().required()
          })
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

export default usePaymentDetailsForm;
