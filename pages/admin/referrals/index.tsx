/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHead from '~/features/shared/components/PageHead';
import ReferralsTable from '~/features/referrals/components/ReferralsTable';

const Referrals: NextPage = () => {
  const { t } = useTranslation('referrals');

  return (
    <div>
      <PageHead isAdmin namespace="referrals" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <ReferralsTable />
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
    ...(await serverSideTranslations(locale, ['referrals', 'common']))
  }
});

export default Referrals;
