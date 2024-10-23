/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useUser from '~/contexts/User/useUser';
import PageHead from '~/features/shared/components/PageHead';
import CreateTaskButton from '~/features/tasks/components/CreateTaskButton';
import TasksTable from '~/features/tasks/components/TasksTable/TasksTable';

const Tasks: NextPage = () => {
  const { id: userId } = useUser();
  const { t } = useTranslation('tasks');
  return (
    <div>
      <PageHead namespace="tasks" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
          <div className="col">
            <div className="actions text-end my-2">
              <CreateTaskButton />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <TasksTable userId={userId} />
        </div>
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['tasks', 'common']))
  }
});

export default Tasks;
