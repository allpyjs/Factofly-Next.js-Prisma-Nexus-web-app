/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useUser from '~/contexts/User/useUser';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import CustomersTable from '~/features/customers/components/CustomersTable/CustomersTable';
import PageHead from '~/features/shared/components/PageHead';

const Customers: NextPage = () => {
  const { id: userId } = useUser();
  const { t } = useTranslation('customers');
  return (
    <div>
      <PageHead namespace="customers" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
          <div className="col">
            <div className="actions text-end my-2">
              <CreateCustomerButton />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <CustomersTable userId={userId} />
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
