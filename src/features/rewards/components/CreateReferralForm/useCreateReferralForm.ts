import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import CreateReferralFormMutation from './graphql/CreateReferralFormMutation.gql';
import { ReferralCreateInputArgs } from '~/.generated/globalTypes';
import { CreateReferralFormData } from './CreateReferralFormData';
import useCreateForm from '~/features/forms/hooks/useCreateForm';

const toInputArgs = (input: CreateReferralFormData): ReferralCreateInputArgs => ({
  email: input.email!,
  message: input.message!
});

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateReferralFormData>>;
};

const useCreateReferralForm = ({ defaultValues }: FormProps) => {
  const { t } = useTranslation('rewards');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          email: yup.string().email().label(t('labels.email:')).required(),
          message: yup.string().label(t('labels.message')).required()
        })
        .required(),
    [t]
  );

  return useCreateForm({
    defaultValues,
    validationSchema,
    translationKey: 'rewards',
    refetchQueries: ['ReferralsQuery'],
    parseData: (formData: CreateReferralFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CreateReferralFormMutation
  });
};

export default useCreateReferralForm;
