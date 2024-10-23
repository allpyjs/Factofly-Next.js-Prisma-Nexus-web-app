/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SalaryView from '~/features/salaries/components/SalaryView';
import PageHead from '~/features/shared/components/PageHead';

const Salary: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <div>
      <PageHead isAdmin namespace="invoices" translationKey="menu.salary" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('menu.salary')}</h1>
          </div>
        </div>
      </div>
      <SalaryView />
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

export default Salary;
