import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditTaskFormUpdateMutation from './graphql/EditTaskFormUpdateMutation.gql';
import { EditTaskFormUpdateMutation as EditTaskFormUpdateMutationType } from './graphql/.generated/EditTaskFormUpdateMutation';
import { TaskUpdateInputArgs } from '../../../../.generated/globalTypes';
import EditTaskFormQuery from './graphql/EditTaskFormQuery.gql';
import {
  EditTaskFormQuery as EditTaskFormQueryType,
  EditTaskFormQuery_task as TaskType
} from './graphql/.generated/EditTaskFormQuery';
import { EditTaskFormData } from './EditTaskFormData';
import useEditForm from '~/features/forms/hooks/useEditForm';
import { toServerDate } from '~/utils/formatDate';

const toFormData = (input: TaskType): EditTaskFormData => ({
  customerId: input.customer.id,
  title: input.title!,
  reference: input.reference!,
  jobTypeId: input.jobType.id,
  startDate: input.startDate ?? undefined,
  endDate: input.endDate ?? undefined,
  expectedHours: input.expectedHours!,

  termsAccepted: input.termsAccepted,
  status: input.status,
  userId: input.user.id,

  paymentType: input.paymentType ?? undefined,
  paymentAmount: input.paymentAmount,
  description: input.description ?? undefined
});

const toInputArgs = (input: EditTaskFormData): TaskUpdateInputArgs => ({
  customer: { connect: { id: input.customerId } },
  title: input.title!,
  reference: input.reference!,
  jobType: { connect: { id: input.jobTypeId } },
  startDate: toServerDate(input.startDate),
  endDate: toServerDate(input.endDate),
  expectedHours: input.expectedHours!,

  termsAccepted: input.termsAccepted,
  status: input.status,

  paymentType: input.paymentType,
  paymentAmount: input.paymentAmount,
  description: input.description
});

const useEditTaskForm = (taskId: number) => {
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
          termsAccepted: yup.bool().label(t('labels.termsAccepted')).required()
        })
        .required(),
    [t]
  );

  return useEditForm({
    validationSchema,
    translationKey: 'tasks',
    parseMutationData: (formData: EditTaskFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: taskId } }
    }),
    parseLoadFormData: (initialData: EditTaskFormQueryType) => toFormData(initialData.task!),
    parseUpdateFormData: (updatedData: EditTaskFormUpdateMutationType) => toFormData(updatedData.updateTask!),
    createMutation: EditTaskFormUpdateMutation,
    query: EditTaskFormQuery,
    queryOptions: {
      variables: {
        where: { id: taskId }
      }
    }
  });
};

export default useEditTaskForm;
