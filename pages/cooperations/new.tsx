/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CooperationAgreementForm from '~/features/cooperationAgreements/components/CreateCoperationAgreementForm';
import PageHead from '~/features/shared/components/PageHead';

const CooperationAgreementCreatePage: NextPage = () => {
  const { t } = useTranslation('cooperationAgreements');
  return (
    <div>
      <PageHead namespace="cooperationAgreements" translationKey="headers.create" />
      <div className="container-sm">
        <h1>{t('headers.create')}</h1>
        <CooperationAgreementForm />
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['cooperationAgreements', 'common']))
  }
});

export default CooperationAgreementCreatePage;
