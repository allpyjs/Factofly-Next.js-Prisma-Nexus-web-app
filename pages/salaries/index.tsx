/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SalaryStatusEnum } from '~/.generated/globalTypes';
import useUser from '~/contexts/User/useUser';
import SalariesTable from '~/features/salaries/components/SalariesTable/SalariesTable';
import PageHead from '~/features/shared/components/PageHead';

const Salaries: NextPage = () => {
  const { t } = useTranslation('salaries');
  const { id: userId } = useUser();
  return (
    <div>
      <PageHead isAdmin namespace="salaries" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <SalariesTable userId={userId} status={SalaryStatusEnum.PAID} />
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
    ...(await serverSideTranslations(locale, ['salaries', 'common']))
  }
});

export default Salaries;
