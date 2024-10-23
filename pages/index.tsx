/* eslint-disable react/function-component-definition */
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TasksTable from '~/features/tasks/components/TasksTable/TasksTable';
import useUser from '~/contexts/User/useUser';
import InvoicesTable from '~/features/invoices/components/InvoicesTable/InvoicesTable';
import Dashboard from '~/features/dashboard/components/Dashboard';
import PageHead from '~/features/shared/components/PageHead';

type PageProps = {
  locale: string;
};

const Home: NextPage = () => {
  const { displayName, id: userId } = useUser();
  const { t } = useTranslation('common');
  return (
    <div>
      <PageHead namespace="common" translationKey="menu.overview" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.welcome', { displayName })}</h1>
          </div>
        </div>
      </div>
      <Dashboard />
      <h2>{t('headers.openInvoices')}</h2>
      <div className="card">
        <div className="card-body">
          <InvoicesTable userId={userId} openInvoicesOnly />
        </div>
      </div>
      <h2>{t('headers.openTasks')}</h2>
      <div className="card">
        <div className="card-body">
          <TasksTable userId={userId} openTasksOnly />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'tasks', 'invoices', 'users']))
  }
});

export default Home;
