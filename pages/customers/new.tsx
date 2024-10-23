/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomerForm from '~/features/customers/components/CreateCustomerForm';
import PageHead from '~/features/shared/components/PageHead';

const CustomerCreatePage: NextPage = () => {
  const { t } = useTranslation('customers');
  return (
    <div>
      <PageHead namespace="customers" translationKey="headers.create" />
      <div className="container-sm">
        <h1>{t('headers.create')}</h1>
        <CustomerForm />
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

export default CustomerCreatePage;
