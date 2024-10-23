/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import SalaryCompleteView from '~/features/salaries/components/SalaryCompleteView';
import PageHead from '~/features/shared/components/PageHead';

const SalaryPage: NextPage = () => {
  const router = useRouter();
  const { id: salaryId } = router.query;

  return (
    <div className="container-sm">
      <PageHead namespace="salaries" translationKey="headers.search" />
      <SalaryCompleteView salaryId={Number(salaryId)} showServiceLogs showUserDetails />
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking' // indicates the type of fallback
});

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['salaries', 'common', 'invoices', 'deductions', 'users']))
  }
});

export default SalaryPage;
