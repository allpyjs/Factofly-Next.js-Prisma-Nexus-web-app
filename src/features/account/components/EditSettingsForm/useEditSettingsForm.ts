import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditSettingsFormUpdateMutation from './graphql/EditSettingsFormUpdateMutation.gql';
import { EditSettingsFormUpdateMutation as EditSettingsFormUpdateMutationType } from './graphql/.generated/EditSettingsFormUpdateMutation';
import EditSettingsFormQuery from './graphql/EditSettingsFormQuery.gql';
import {
  EditSettingsFormQuery as EditSettingsFormQueryType,
  EditSettingsFormQuery_me as UserType
} from './graphql/.generated/EditSettingsFormQuery';
import { TaxCardEnum, UserUpdateInputArgs } from '~/.generated/globalTypes';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditSettingsFormData = {
  id: bigint;
  jobTypeId?: bigint;
  customerCountryId?: bigint;
  unit?: string;
  currency?: string;
  language?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;

  address?: {
    address?: string;
    city?: string;
    postalCode?: string;
    countryId?: bigint;
  };

  bankNameHidden?: string;
  bankAccountHidden?: string;
  bankRegistrationHidden?: string;

  personIdHidden?: string;
  taxCardHidden?: string;

  bankNameNew?: string;
  bankAccountNew?: string;
  bankRegistrationNew?: string;

  personIdNew?: string;
  taxCardNew?: TaxCardEnum;

  vacationPayment?: boolean;
};

const toFormData = (input: UserType): EditSettingsFormData => ({
  id: input.id,
  jobTypeId: input.jobType?.id,
  unit: input.unit ?? undefined,
  currency: input.currency ?? undefined,
  language: input.language,

  firstName: input.firstName ?? undefined,
  lastName: input.lastName ?? undefined,
  email: input.email ?? undefined,
  phoneNumber: input.phoneNumber ?? undefined,

  address: {
    address: input.address?.address,
    city: input.address?.city,
    postalCode: input.address?.postalCode,
    countryId: input.address?.countryId
  },

  bankNameHidden: input.bankAccountHidden?.bankName ?? undefined,
  bankAccountHidden: input.bankAccountHidden?.bankAccount ?? undefined,
  bankRegistrationHidden: input.bankAccountHidden?.bankRegistration ?? undefined,

  personIdHidden: input.taxInfoHidden?.personId ?? undefined,
  taxCardHidden: input.taxInfoHidden?.taxCard ?? undefined,

  vacationPayment: input.vacationPayment ?? undefined
});

const toInputArgs = (input: EditSettingsFormData): UserUpdateInputArgs => ({
  jobType: input.jobTypeId ? { connect: { id: input.jobTypeId } } : undefined,
  unit: input.unit,
  currency: input.currency,
  language: input.language!,

  firstName: input.firstName!,
  lastName: input.lastName!,
  email: input.email,
  phoneNumber: input.phoneNumber,

  address: input.address?.address,
  city: input.address?.city,
  postalCode: input.address?.postalCode,
  countryId: input.address?.countryId,

  bankName: input.bankNameNew ?? undefined,
  bankAccount: input.bankAccountNew ?? undefined,
  bankRegistration: input.bankRegistrationNew ?? undefined,

  personId: input.personIdNew ?? undefined,
  taxCard: input.taxCardNew ?? undefined,

  vacationPayment: input.vacationPayment ?? undefined
});

const useEditSettingsForm = (userId: bigint) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          jobTypeId: yup.number().label(t('labels.jobType')),
          unit: yup.string().label(t('labels.unit')).required(),
          currency: yup.string().label(t('labels.currency')).required(),
          language: yup.string().label(t('labels.language')).required(),

          firstName: yup.string().label(t('labels.firstName')).required(),
          lastName: yup.string().label(t('labels.lastName')).required(),
          email: yup.string().email().label(t('labels.email')).required(),
          phoneNumber: yup.string().label(t('labels.phoneNumber')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'users',
    parseMutationData: (formData: EditSettingsFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: userId } }
    }),
    parseLoadFormData: (initialData: EditSettingsFormQueryType) => toFormData(initialData.me!),
    parseUpdateFormData: (updatedData: EditSettingsFormUpdateMutationType) =>
      toFormData(updatedData.updateUser!),
    createMutation: EditSettingsFormUpdateMutation,
    query: EditSettingsFormQuery
  });
};

export default useEditSettingsForm;
