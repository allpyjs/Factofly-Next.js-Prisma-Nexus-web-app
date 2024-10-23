/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useUser from '~/contexts/User/useUser';
import KpiReport from '~/features/reports/components/KpiReport';

const Reports: NextPage = () => {
  const { isAdmin } = useUser();

  if (!isAdmin) return <div />;
  return (
    <div>
      <div className="page-header">
        <h1>Reports</h1>
      </div>
      <KpiReport />
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['reports', 'common']))
  }
});

export default Reports;
