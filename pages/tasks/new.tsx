/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHead from '~/features/shared/components/PageHead';
import TaskForm from '~/features/tasks/components/CreateTaskForm';

const TaskCreatePage: NextPage = () => {
  const { t } = useTranslation('tasks');
  return (
    <div>
      <PageHead namespace="tasks" translationKey="headers.create" />
      <div className="container-sm">
        <h1>{t('headers.create')}</h1>
        <TaskForm />
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['tasks', 'common']))
  }
});

export default TaskCreatePage;
