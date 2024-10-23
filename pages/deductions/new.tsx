/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DeductionForm from '~/features/deductions/components/CreateDeductionForm';
import PageHead from '~/features/shared/components/PageHead';

const DeductionCreatePage: NextPage = () => {
  const { t } = useTranslation('deductions');
  return (
    <div>
      <PageHead namespace="deductions" translationKey="headers.create" />
      <div className="container-sm">
        <h1>{t('headers.create')}</h1>
        <DeductionForm />
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

export default DeductionCreatePage;
