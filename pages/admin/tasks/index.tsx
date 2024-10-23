/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TasksTable from '~/features/tasks/components/TasksTable/TasksTable';
import PageHead from '~/features/shared/components/PageHead';

const Tasks: NextPage = () => {
  const { t } = useTranslation('tasks');
  return (
    <div>
      <PageHead isAdmin namespace="tasks" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <TasksTable showUser allowContractDownload allowDelete showId />
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
