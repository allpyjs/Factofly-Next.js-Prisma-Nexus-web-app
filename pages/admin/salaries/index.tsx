/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SalaryView from '~/features/salaries/components/SalaryView';
import PageHead from '~/features/shared/components/PageHead';

const Salaries: NextPage = () => (
  <div>
    <PageHead isAdmin namespace="common" translationKey="menu.salary" />
    <SalaryView />
  </div>
);

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'invoices',
      'common',
      'deductions',
      'users',
      'customers',
      'salaries'
    ]))
  }
});

export default Salaries;
