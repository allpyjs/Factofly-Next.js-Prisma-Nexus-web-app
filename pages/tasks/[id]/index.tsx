/* eslint-disable react/function-component-definition */
import type { GetStaticPaths, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHead from '~/features/shared/components/PageHead';
import TaskDetails from '~/features/tasks/components/TaskDetails';

const TaskPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="tasks" translationKey="headers.details" />
    <TaskDetails />
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
    ...(await serverSideTranslations(locale, ['tasks', 'common', 'customers']))
  }
});

export default TaskPage;
