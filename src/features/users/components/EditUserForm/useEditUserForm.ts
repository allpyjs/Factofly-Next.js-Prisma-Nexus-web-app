import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditUserFormUpdateMutation from './graphql/EditUserFormUpdateMutation.gql';
import { EditUserFormUpdateMutation as EditUserFormUpdateMutationType } from './graphql/.generated/EditUserFormUpdateMutation';
import EditUserFormQuery from './graphql/EditUserFormQuery.gql';
import { EditUserFormQuery as EditUserFormQueryType } from './graphql/.generated/EditUserFormQuery';
import { EditUserFormData } from './EditUserFormData';
import toFormData from './toFormData';
import toInputArgs from './toInputArgs';
import useEditForm from '~/features/forms/hooks/useEditForm';
import transformNumber from '~/utils/transformNumber';

const useUpdateUserForm = (userId: bigint) => {
  const { t } = useTranslation('users');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          jobTypeId: yup.number().label(t('labels.jobType')),
          unit: yup.string().label(t('labels.unit')).required(),
          currency: yup.string().label(t('labels.currency')).required(),
          language: yup.string().label(t('labels.language')).required(),
          email: yup.string().email().label(t('labels.firstName')).required(),

          salaryPaymentType: yup.string().nullable().label(t('labels.salaryPaymentType')),
          salaryPaymentDay: yup
            .number()
            .label(t('labels.salaryPaymentDay'))
            .when('salaryPaymentType', {
              is: 'TIMED',
              then: (schema) => schema.required().min(1).max(32),
              otherwise: (schema) => schema.nullable()
            }),
          salaryPaymentValue: yup
            .number()
            .label(t('labels.salaryPaymentValue'))
            .when('salaryPaymentType', {
              is: 'VALUE',
              then: (schema) => schema.required().min(1),
              otherwise: (schema) => schema.nullable()
            }),
          baseRate: yup.number().transform(transformNumber).nullable().label(t('labels.baseRate'))
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'users',
    parseMutationData: (formData: EditUserFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: Number(userId) } }
    }),
    parseLoadFormData: (initialData: EditUserFormQueryType) => toFormData(initialData.user!),
    parseUpdateFormData: (updatedData: EditUserFormUpdateMutationType) => toFormData(updatedData.updateUser!),
    createMutation: EditUserFormUpdateMutation,
    query: EditUserFormQuery,
    queryOptions: {
      variables: {
        where: { id: Number(userId) }
      }
    }
  });
};

export default useUpdateUserForm;
