/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGOUT_PAGE } from '~/constants/appRoutes';
import PageHead from '~/features/shared/components/PageHead';

const VerifyEmailPage: NextPage = () => {
  const { t } = useTranslation('users');
  const { reload, push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // periodically check to see if the user has been verified yet
      reload();
    }, 60000);

    return () => {
      clearTimeout(timeout);
    };
  }, [reload]);

  return (
    <div className="container-sm text-center">
      <PageHead namespace="common" translationKey="pages.verifyEmail" />
      <div className="verification-text">
        <Trans
          i18nKey="errors.emailVerification"
          t={t}
          components={{
            // eslint-disable-next-line jsx-a11y/heading-has-content
            h1: <h1 />,
            // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
            phoneLink: <a href="tel: +45 71 96 00 54" />
          }}
        />
      </div>
      <button type="button" className="btn btn-primary mt-4" onClick={() => push(LOGOUT_PAGE)}>
        {t('buttons.logOut')}
      </button>
      <style jsx>{`
        .container-sm {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
        }
        .btn {
          width: 200px;
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
