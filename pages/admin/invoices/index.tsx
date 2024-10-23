/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import InvoicesTable from '~/features/invoices/components/InvoicesTable/InvoicesTable';
import PageHead from '~/features/shared/components/PageHead';

const Invoices: NextPage = () => {
  const { t } = useTranslation('invoices');
  return (
    <div>
      <PageHead isAdmin namespace="invoices" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <InvoicesTable showUser allowContractDownload showId allowBulkUpdate />
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
    ...(await serverSideTranslations(locale, ['invoices', 'common']))
  }
});

export default Invoices;
