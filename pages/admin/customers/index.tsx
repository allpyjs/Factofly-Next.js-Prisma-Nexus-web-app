/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomersTable from '~/features/customers/components/CustomersTable/CustomersTable';
import PageHead from '~/features/shared/components/PageHead';

const Customers: NextPage = () => {
  const { t } = useTranslation('customers');
  return (
    <div>
      <PageHead isAdmin namespace="customers" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <CustomersTable showUser allowDelete showId />
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
    ...(await serverSideTranslations(locale, ['customers', 'common']))
  }
});

export default Customers;
