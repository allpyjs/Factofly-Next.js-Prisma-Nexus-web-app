/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useUser from '~/contexts/User/useUser';
import CreateInvoiceButton from '~/features/invoices/components/CreateInvoiceButton';
import InvoicesTable from '~/features/invoices/components/InvoicesTable/InvoicesTable';
import PageHead from '~/features/shared/components/PageHead';

const Invoices: NextPage = () => {
  const { id: userId } = useUser();
  const { t } = useTranslation('invoices');
  return (
    <div>
      <PageHead namespace="invoices" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
          <div className="col">
            <div className="actions text-end my-2">
              <CreateInvoiceButton />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <InvoicesTable userId={userId} />
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
