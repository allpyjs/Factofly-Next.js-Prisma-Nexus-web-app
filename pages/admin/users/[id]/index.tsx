/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import UserDetails from '~/features/users/components/UserDetails';
import InvoicesTable from '~/features/invoices/components/InvoicesTable/InvoicesTable';
import TasksTable from '~/features/tasks/components/TasksTable/TasksTable';
import CustomersTable from '~/features/customers/components/CustomersTable';
import DeductionsTable from '~/features/deductions/components/DeductionsTable';
import CooperationAgreementsTable from '~/features/cooperationAgreements/components/CooperationAgreementsTable';
import PageHead from '~/features/shared/components/PageHead';

const UserPage: NextPage = () => {
  const {
    query: { id }
  } = useRouter();
  const userId = parseInt(id! as string, 10);

  const [key, setKey] = useState('invoices');

  return (
    <div>
      <PageHead isAdmin namespace="users" translationKey="headers.details" />
      <UserDetails />

      <Tabs id="user-tabs" activeKey={key} onSelect={(k) => setKey(k!)}>
        <Tab eventKey="invoices" title="Invoices">
          {key === 'invoices' && (
            <div className="card">
              <div className="card-body">
                <InvoicesTable
                  userId={userId}
                  showUser={false}
                  allowContractDownload
                  showId
                  allowBulkUpdate
                />
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="customers" title="Customers">
          {key === 'customers' && (
            <div className="card">
              <div className="card-body">
                <CustomersTable userId={userId} showUser={false} allowDelete />
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="tasks" title="Tasks">
          {key === 'tasks' && (
            <div className="card">
              <div className="card-body">
                <TasksTable userId={userId} showUser={false} allowContractDownload allowDelete />
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="deductions" title="Deductions">
          {key === 'deductions' && (
            <div className="card">
              <div className="card-body">
                <DeductionsTable userId={userId} showUser={false} allowDelete />
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="cooperations" title="Cooperation">
          {key === 'cooperations' && (
            <div className="card">
              <div className="card-body">
                <CooperationAgreementsTable userId={userId} showUser={false} allowDelete />
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
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
    ...(await serverSideTranslations(locale, [
      'users',
      'invoices',
      'tasks',
      'common',
      'customers',
      'deductions',
      'cooperationAgreements'
    ]))
  }
});

export default UserPage;
