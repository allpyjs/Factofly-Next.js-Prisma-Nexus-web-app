/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DeductionsTable from '~/features/deductions/components/DeductionsTable/DeductionsTable';
import PageHead from '~/features/shared/components/PageHead';

const Deductions: NextPage = () => {
  const { t } = useTranslation('deductions');
  return (
    <div>
      <PageHead isAdmin namespace="deductions" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <DeductionsTable showUser allowDelete showId />
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
    ...(await serverSideTranslations(locale, ['deductions', 'common']))
  }
});

export default Deductions;
