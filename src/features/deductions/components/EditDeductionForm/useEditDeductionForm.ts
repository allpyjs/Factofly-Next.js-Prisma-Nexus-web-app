import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditDeductionFormUpdateMutation from './graphql/EditDeductionFormUpdateMutation.gql';
import { EditDeductionFormUpdateMutation as EditDeductionFormUpdateMutationType } from './graphql/.generated/EditDeductionFormUpdateMutation';
import { DeductionStatusEnum, DeductionUpdateInputArgs } from '../../../../.generated/globalTypes';
import EditDeductionFormQuery from './graphql/EditDeductionFormQuery.gql';
import {
  EditDeductionFormQuery as EditDeductionFormQueryType,
  EditDeductionFormQuery_deduction as DeductionType
} from './graphql/.generated/EditDeductionFormQuery';
import uploadDeductionFile from '../../utils/uploadDeductionFile';
import useEditForm from '~/features/forms/hooks/useEditForm';
import transformNumber from '~/utils/transformNumber';

export type EditDeductionFormData = {
  description: string;
  status: DeductionStatusEnum;
  currency?: string;
  total?: string;
  imageUrl?: string;
  imageFile?: any;
  includeVat?: boolean;
};

const toFormData = (input: DeductionType): EditDeductionFormData => ({
  description: input.description,
  status: input.status,
  imageUrl: input.imageUrl ?? undefined,
  includeVat: input.includeVat ?? undefined,
  total: input.total,
  currency: input.currency ?? undefined
});

const toInputArgs = (input: EditDeductionFormData): DeductionUpdateInputArgs => ({
  description: input.description,
  status: input.status,
  total: input.total!,
  currency: input.currency!,
  includeVat: input.includeVat
});

type UpdateDeductionFormHookProps = {
  onCompleted?: () => void;
};

const useUpdateDeductionForm = (deductionId: number, { onCompleted }: UpdateDeductionFormHookProps = {}) => {
  const { t } = useTranslation('deductions');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          description: yup.string().label(t('labels.description')).required(),
          currency: yup.string().label(t('labels.currency')).required(),
          total: yup
            .number()
            .nullable()
            .label(t('labels.total'))
            .transform(transformNumber)
            .not([0])
            .required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'deductions',
    parseMutationData: (formData: EditDeductionFormData) => ({
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
    },
    onBeforeCompleted: async (formData, { updateDeduction }) =>
      uploadDeductionFile(updateDeduction!.id, formData.imageFile),
    onCompleted: (result, form) => {
      form.setValue('imageFile', null);
      if (onCompleted) onCompleted();
    }
  });
};

export default useUpdateDeductionForm;
