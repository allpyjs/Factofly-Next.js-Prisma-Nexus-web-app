/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHead from '~/features/shared/components/PageHead';

const VerifyEmailPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container-sm text-center">
      <PageHead namespace="common" translationKey="pages.error" />
      <div className="error-text">{t('errors.applicationError')}</div>
      <style jsx>{`
        .error-text {
          margin-top: 40%;
          margin-bottom: 20px;
          font-size: 1.1rem;
          margin-bottom: 5rem;
        }
      `}</style>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['users', 'common']))
  }
});

export default VerifyEmailPage;
