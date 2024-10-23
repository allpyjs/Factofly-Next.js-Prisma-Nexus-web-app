import { DocumentNode, MutationFunctionOptions, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeepPartial, UnpackNestedValue, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { AnyObjectSchema, setLocale } from 'yup';
import defaultLocale from 'yup/lib/locale';
import yupLocaleDA from '../locales/yupLocaleDA';

type FormProps<TFormData, TNode> = {
  defaultValues?: UnpackNestedValue<DeepPartial<TFormData>>;
  createMutation: DocumentNode;
  refetchQueries?: string[];
  onCompleted?: (data: TNode) => void;
  onBeforeCompleted?: (formData: TFormData, result: TNode) => Promise<void>;
  translationKey: string;
  parseData: (data: TFormData) => MutationFunctionOptions;
  validationSchema: AnyObjectSchema;
};

function useCreateForm<TFormData, TNode>({
  defaultValues,
  createMutation,
  parseData,
  translationKey,
  validationSchema,
  refetchQueries = [],
  onBeforeCompleted = undefined,
  onCompleted = undefined
}: FormProps<TFormData, TNode>) {
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation(translationKey);

  const [create, { data, loading: saving, error }] = useMutation(createMutation, {
    onError: () => enqueueSnackbar(t('errors.create'), { variant: 'error' }),
    refetchQueries: ['AuditCardQuery', ...refetchQueries]
  });

  if (i18n.language === 'da') {
    setLocale(yupLocaleDA);
  } else {
    setLocale(defaultLocale);
  }

  const submitHandler = useCallback(
    (formData: TFormData) => {
      create({
        ...parseData(formData),
        onCompleted: async (result) => {
          if (onBeforeCompleted) await onBeforeCompleted(formData, result);
          enqueueSnackbar(t('messages.created'), { variant: 'success' });
          if (onCompleted) onCompleted(result);
        }
      });
    },
    [create, parseData, enqueueSnackbar, onBeforeCompleted, onCompleted, t]
  );

  const isRequired = useCallback(
    (field: string) => validationSchema.fields[field]?.exclusiveTests.required || false,
    [validationSchema]
  );

  const form = useForm<TFormData>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  return {
    onSubmit: submitHandler,
    data,
    saving,
    error,
    form,
    isRequired
  };
}

export default useCreateForm;
