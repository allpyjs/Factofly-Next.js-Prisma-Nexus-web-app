/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import CustomerDetails from '~/features/customers/components/CustomerDetails';
import InvoicesTable from '~/features/invoices/components/InvoicesTable/InvoicesTable';
import PageHead from '~/features/shared/components/PageHead';
import TasksTable from '~/features/tasks/components/TasksTable/TasksTable';

const CustomerPage: NextPage = () => {
  const {
    query: { id }
  } = useRouter();
  const customerId = parseInt(id! as string, 10);
  const { t } = useTranslation('customers');

  return (
    <div>
      <PageHead namespace="customers" translationKey="headers.details" />
      <CustomerDetails />
      <h2>{t('headers.openInvoices')}</h2>
      <div className="card">
        <div className="card-body">
          <InvoicesTable customerId={customerId} showCustomer={false} openInvoicesOnly />
        </div>
      </div>
      <h2>{t('headers.openTasks')}</h2>
      <div className="card">
        <div className="card-body">
          <TasksTable customerId={customerId} showCustomer={false} openTasksOnly />
        </div>
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking' // indicates the type of fallback
});

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['customers', 'invoices', 'tasks', 'common']))
  }
});

export default CustomerPage;
