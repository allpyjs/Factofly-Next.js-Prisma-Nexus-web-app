import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import TaskDetailsQuery from './graphql/TaskDetailsQuery.gql';
import { TaskDetailsQuery as TaskDetailsQueryType } from './graphql/.generated/TaskDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '../../../shared/components/TopActions';
import ButtonLink from '~/features/shared/components/ButtonLink';
import TaskCard from './TaskCard';
import useUser from '~/contexts/User/useUser';
import AuditCard from '~/features/audits/components/AuditCard';
import DeleteButton from '~/features/shared/components/DeleteButton';
import useDeleteTask from '../../hooks/useDeleteTask';
import { TaskStatusEnum } from '~/.generated/globalTypes';

function TaskDetails(): JSX.Element {
  const router = useRouter();
  const { isAdmin } = useUser();
  const { id } = router.query;
  const { deleteTask } = useDeleteTask();
  const { t } = useTranslation('tasks');

  const { loading, error, data } = useQuery<TaskDetailsQueryType>(TaskDetailsQuery, {
    variables: {
      where: { id }
    }
  });

  if (loading) return <div className="loading" />;

  const task = data?.task;

  const canEdit = task?.status === TaskStatusEnum.DRAFT || isAdmin;

  return (
    <div>
      <div className="header row">
        <TopActions>
          <ButtonLink
            icon="uil-invoice"
            title={t('buttons.createInvoice')}
            href={encodeURI(`/invoices/new?task_id=${id}`)}
          />
          <ButtonLink icon="uil-calender" title={t('buttons.create')} href={encodeURI(`/tasks/new`)} />
          {canEdit && (
            <>
              <ButtonLink icon="uil-pen" title={t('buttons.edit')} href={`/tasks/${id}/edit`} />
              <DeleteButton onConfirm={() => deleteTask(task?.id)} />
            </>
          )}
        </TopActions>
        <h1 className="page-title">{data?.task?.title}</h1>
      </div>
      <TaskCard task={task!} />
      {isAdmin && <AuditCard recordId={task!.id} recordType="TASK" />}
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default TaskDetails;
