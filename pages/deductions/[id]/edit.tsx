/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditDeductionForm from '~/features/deductions/components/EditDeductionForm';
import PageHead from '~/features/shared/components/PageHead';

const DeductionEditPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="deductions" translationKey="headers.edit" />
    <EditDeductionForm />
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
    ...(await serverSideTranslations(locale, ['deductions', 'common']))
  }
});

export default DeductionEditPage;
