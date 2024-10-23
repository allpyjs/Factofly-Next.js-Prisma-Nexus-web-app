import { useMemo } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import CreateTaskFormMutation from './graphql/CreateTaskFormMutation.gql';
import { CreateTaskFormMutation as CreateTaskFormMutationType } from './graphql/.generated/CreateTaskFormMutation';
import { TaskCreateInputArgs } from '~/.generated/globalTypes';
import { CreateTaskFormData } from './CreateTaskFormData';
import useCreateForm from '~/features/forms/hooks/useCreateForm';
import { toServerDate } from '~/utils/formatDate';

const toInputArgs = (input: CreateTaskFormData): TaskCreateInputArgs => ({
  customer: { connect: { id: input.customerId } },
  title: input.title!,
  reference: input.reference,
  jobType: { connect: { id: input.jobTypeId } },
  startDate: toServerDate(input.startDate),
  endDate: toServerDate(input.endDate),
  expectedHours: input.expectedHours!,

  termsAccepted: input.termsAccepted,
  status: input.status,
  createAsUserId: input.createAsUserId,

  paymentType: input.paymentType,
  paymentAmount: input.paymentAmount,
  description: input.description
});

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateTaskFormData>>;
};

const useCreateTaskForm = ({ defaultValues }: FormProps) => {
  const { push } = useRouter();
  const { t } = useTranslation('tasks');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          customerId: yup.number().label(t('labels.customer')).required(),
          title: yup.string().label(t('labels.title')).required(),
          reference: yup.string().label(t('labels.reference')),
          jobTypeId: yup.number().label(t('labels.jobType')).required(),
          startDate: yup.date().label(t('labels.startDate')).required(),
          endDate: yup.date().label(t('labels.endDate')).required().min(yup.ref('startDate')),
          expectedHours: yup
            .number()
            .integer()
            .label(t('labels.expectedHours'))
            .transform((value) => (Number.isNaN(value) ? undefined : value))
            .nullable()
            .required(),
          termsAccepted: yup
            .bool()
            .oneOf([true], t('validation.termsAccepted'))
            .label(t('labels.termsAccepted'))
            .required()
        })
        .required(),
    [t]
  );

  return useCreateForm({
    defaultValues,
    validationSchema,
    translationKey: 'tasks',
    refetchQueries: ['TasksTableQuery', 'TaskSelectFieldQuery'],
    parseData: (formData: CreateTaskFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CreateTaskFormMutation,
    onCompleted: ({ createTask }: CreateTaskFormMutationType) => {
      push(`/tasks/${createTask!.id}`);
    }
  });
};

export default useCreateTaskForm;
