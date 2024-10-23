import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditDeductionFormUpdateMutation from './graphql/EditDeductionFormUpdateMutation.gql';
import { EditDeductionFormUpdateMutation as EditDeductionFormUpdateMutationType } from './graphql/.generated/EditDeductionFormUpdateMutation';
import EditDeductionFormQuery from './graphql/EditDeductionFormQuery.gql';
import { DeductionStatusEnum, DeductionUpdateInputArgs } from '~/.generated/globalTypes';
import {
  EditDeductionFormQuery as EditDeductionFormQueryType,
  EditDeductionFormQuery_deduction as DeductionType
} from './graphql/.generated/EditDeductionFormQuery';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditDeductionStatusFormData = {
  id: bigint;
  status: DeductionStatusEnum;
};

export const toFormData = (input: DeductionType): EditDeductionStatusFormData => ({
  id: input.id,
  status: input.status
});

export const toInputArgs = (input: EditDeductionStatusFormData): DeductionUpdateInputArgs => ({
  status: input.status
});

const useEditDeductionStatusForm = (deductionId: number) => {
  const { t } = useTranslation('deductions');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          status: yup.string().label(t('labels.status')).required()
        })
        .required(),
    [t]
  );
  return useEditForm({
    validationSchema,
    translationKey: 'deductions',
    parseMutationData: (formData: EditDeductionStatusFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: deductionId } }
    }),
    parseLoadFormData: (initialData: EditDeductionFormQueryType) => toFormData(initialData.deduction!),
    parseUpdateFormData: (updatedData: EditDeductionFormUpdateMutationType) =>
      toFormData(updatedData.updateDeduction!),
    createMutation: EditDeductionFormUpdateMutation,
    query: EditDeductionFormQuery,
    queryOptions: {
      variables: {
        where: { id: deductionId }
      }
    }
  });
};

export default useEditDeductionStatusForm;
