import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditTaskFormUpdateMutation from './graphql/EditTaskFormUpdateMutation.gql';
import { EditTaskFormUpdateMutation as EditTaskFormUpdateMutationType } from './graphql/.generated/EditTaskFormUpdateMutation';
import EditTaskFormQuery from './graphql/EditTaskFormQuery.gql';
import { TaskStatusEnum, TaskUpdateInputArgs } from '~/.generated/globalTypes';
import {
  EditTaskFormQuery as EditTaskFormQueryType,
  EditTaskFormQuery_task as TaskType
} from './graphql/.generated/EditTaskFormQuery';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditTaskStatusFormData = {
  id: bigint;
  status: TaskStatusEnum;
};

export const toFormData = (input: TaskType): EditTaskStatusFormData => ({
  id: input.id,
  status: input.status
});

export const toInputArgs = (input: EditTaskStatusFormData): TaskUpdateInputArgs => ({
  status: input.status
});

const useEditTaskStatusForm = (taskId: number) => {
  const { t } = useTranslation('tasks');

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
    translationKey: 'tasks',
    parseMutationData: (formData: EditTaskStatusFormData) => ({
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

export default useEditTaskStatusForm;
