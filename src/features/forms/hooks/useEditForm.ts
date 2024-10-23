import {
  DocumentNode,
  MutationFunctionOptions,
  QueryHookOptions,
  useMutation,
  useQuery
} from '@apollo/client';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeepPartial, UnpackNestedValue, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { AnyObjectSchema, setLocale } from 'yup';
import defaultLocale from 'yup/lib/locale';
import yupLocaleDA from '../locales/yupLocaleDA';

type FormProps<TFormData, TLoad, TUpdate> = {
  defaultValues?: UnpackNestedValue<DeepPartial<TFormData>>;
  createMutation: DocumentNode;
  query: DocumentNode;
  queryOptions?: QueryHookOptions;
  refetchQueries?: string[];
  onCompleted?: (data: TUpdate, form: UseFormReturn<TFormData>) => void;
  onBeforeCompleted?: (formData: TFormData, result: TUpdate) => Promise<void>;
  translationKey: string;
  parseMutationData: (data: TFormData) => MutationFunctionOptions;
  parseLoadFormData: (data: TLoad) => TFormData;
  parseUpdateFormData: (data: TUpdate) => TFormData;
  validationSchema: AnyObjectSchema;
  showSuccessNotification?: boolean;
};

function useEditForm<TFormData, TLoad, TUpdate>({
  defaultValues = undefined,
  createMutation,
  query,
  queryOptions,
  parseMutationData,
  parseLoadFormData,
  parseUpdateFormData,
  translationKey,
  validationSchema,
  refetchQueries = [],
  onBeforeCompleted = undefined,
  onCompleted = undefined,
  showSuccessNotification = true
}: FormProps<TFormData, TLoad, TUpdate>) {
  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation(translationKey);

  const form = useForm<TFormData>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const {
    loading,
    error: loadError,
    data: initialData
  } = useQuery<TLoad>(query, {
    ...queryOptions,
    onCompleted: (loadedData) =>
      form.reset(parseLoadFormData(loadedData) as UnpackNestedValue<DeepPartial<TFormData>>)
  });

  const [update, { data: updatedData, loading: saving, error: saveError }] = useMutation<TUpdate>(
    createMutation,
    {
      onError: () => {
        enqueueSnackbar(t('errors.update'), { variant: 'error' });
      },
      refetchQueries: [query, 'AuditCardQuery', ...refetchQueries]
    }
  );

  if (i18n.language === 'da') {
    setLocale(yupLocaleDA);
  } else {
    setLocale(defaultLocale);
  }

  const submitHandler = useCallback(
    (formData: TFormData) => {
      update({
        ...parseMutationData(formData),
        onCompleted: async (result) => {
          if (onBeforeCompleted) await onBeforeCompleted(formData, result);
          if (showSuccessNotification) enqueueSnackbar(t('messages.updated'), { variant: 'success' });
          if (onCompleted) onCompleted(result, form);
        }
      });
    },
    [
      update,
      parseMutationData,
      enqueueSnackbar,
      onBeforeCompleted,
      onCompleted,
      t,
      form,
      showSuccessNotification
    ]
  );

  const isRequired = useCallback(
    (field: string) => validationSchema.fields[field]?.exclusiveTests.required || false,
    [validationSchema]
  );

  const data =
    (updatedData && parseUpdateFormData(updatedData)) ?? (initialData && parseLoadFormData(initialData));

  return {
    onSubmit: submitHandler,
    data,
    saving,
    loading,
    error: saveError ?? loadError,
    form,
    isRequired
  };
}

export default useEditForm;
