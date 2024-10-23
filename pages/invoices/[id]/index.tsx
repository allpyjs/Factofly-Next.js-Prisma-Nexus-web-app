/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InvoiceDetails from '~/features/invoices/components/InvoiceDetails';
import PageHead from '~/features/shared/components/PageHead';

const InvoicePage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="invoices" translationKey="headers.search" />
    <InvoiceDetails />
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
    ...(await serverSideTranslations(locale, ['invoices', 'common', 'customers', 'rewards']))
  }
});

export default InvoicePage;
