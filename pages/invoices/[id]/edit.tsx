/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditInvoiceForm from '~/features/invoices/components/EditInvoiceForm';
import PageHead from '~/features/shared/components/PageHead';

const InvoiceEditPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="invoices" translationKey="headers.edit" />
    <EditInvoiceForm />
  </div>
);

type PageProps = {
  locale: string;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking' // indicates the type of fallback
});

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['invoices', 'common', 'rewards']))
  }
});

export default InvoiceEditPage;
