import { useMemo } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import CreateDeductionFormMutation from './graphql/CreateDeductionFormMutation.gql';
import { CreateDeductionFormMutation as CreateDeductionFormMutationType } from './graphql/.generated/CreateDeductionFormMutation';
import { DeductionCreateInputArgs, DeductionStatusEnum } from '~/.generated/globalTypes';
import uploadDeductionFile from '../../utils/uploadDeductionFile';
import useCreateForm from '~/features/forms/hooks/useCreateForm';
import transformNumber from '~/utils/transformNumber';

export type CreateDeductionFormData = {
  description?: string;
  currency?: string;
  total?: string;
  imageFile?: any;
  createAsUserId?: number;
  includeVat?: boolean;
};

const toInputArgs = (input: CreateDeductionFormData): DeductionCreateInputArgs => ({
  description: input.description!,
  status: DeductionStatusEnum.SENT,
  createAsUserId: input.createAsUserId,
  total: input.total!,
  currency: input.currency!,
  includeVat: input.includeVat!
});

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateDeductionFormData>>;
};

const useCreateDeductionForm = ({ defaultValues }: FormProps) => {
  const { push } = useRouter();
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
            .required(),
          imageFile: yup
            .mixed()
            .test('required', t('validation.fileRequired'), (file) => {
              if (file && file.size) return true;
              return false;
            })
            .test('fileSize', t('validation.fileTooLarge'), (file) => file && file.size <= 9.7 * 1000 * 1000)
        })
        .required(),
    [t]
  );

  return useCreateForm({
    defaultValues,
    validationSchema,
    translationKey: 'deductions',
    refetchQueries: ['DeductionsTableQuery'],
    parseData: (formData: CreateDeductionFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CreateDeductionFormMutation,
    onBeforeCompleted: async (formData, { createDeduction }: CreateDeductionFormMutationType) =>
      uploadDeductionFile(createDeduction!.id, formData.imageFile),
    onCompleted: ({ createDeduction }: CreateDeductionFormMutationType) => {
      push(`/deductions/${createDeduction!.id}`);
    }
  });
};

export default useCreateDeductionForm;
