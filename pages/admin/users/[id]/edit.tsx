/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EditUserForm from '~/features/users/components/EditUserForm';
import PageHead from '~/features/shared/components/PageHead';

const UserEditPage: NextPage = () => (
  <div className="container-sm">
    <PageHead isAdmin namespace="users" translationKey="headers.edit" />
    <EditUserForm />
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
    ...(await serverSideTranslations(locale, ['users', 'common']))
  }
});

export default UserEditPage;
