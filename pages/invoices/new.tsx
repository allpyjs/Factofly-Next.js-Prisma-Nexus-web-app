/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InvoiceForm from '~/features/invoices/components/CreateInvoiceForm';
import PageHead from '~/features/shared/components/PageHead';

const InvoiceCreatePage: NextPage = () => {
  const { t } = useTranslation('invoices');
  return (
    <div>
      <PageHead namespace="invoices" translationKey="headers.create" />
      <div className="container-sm">
        <h1>{t('headers.create')}</h1>
        <InvoiceForm />
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['invoices', 'common', 'rewards']))
  }
});

export default InvoiceCreatePage;
