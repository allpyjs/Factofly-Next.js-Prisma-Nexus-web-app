/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CooperationAgreementDetails from '~/features/cooperationAgreements/components/CooperationAgreementDetails';
import PageHead from '~/features/shared/components/PageHead';

const CooperationAgreementPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="cooperationAgreements" translationKey="headers.details" />
    <CooperationAgreementDetails />
  </div>
);

type PageProps = {
  locale: string;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking' // indicates the type of fallback
});

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['cooperationAgreements', 'common']))
  }
});

export default CooperationAgreementPage;
