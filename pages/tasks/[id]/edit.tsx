/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHead from '~/features/shared/components/PageHead';
import EditTaskForm from '~/features/tasks/components/EditTaskForm';

const TaskEditPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="tasks" translationKey="headers.details" />
    <EditTaskForm />
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
    ...(await serverSideTranslations(locale, ['tasks', 'common']))
  }
});

export default TaskEditPage;
