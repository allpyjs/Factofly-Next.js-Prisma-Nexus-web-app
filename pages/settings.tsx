/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditSettingsForm from '~/features/account/components/EditSettingsForm';
import PageHead from '~/features/shared/components/PageHead';

const SettingsEditPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="common" translationKey="menu.settings" />
    <EditSettingsForm />
  </div>
);

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['users', 'common']))
  }
});

export default SettingsEditPage;
