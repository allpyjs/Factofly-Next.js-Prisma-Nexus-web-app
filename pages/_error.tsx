import * as Sentry from '@sentry/nextjs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextError from 'next/error';

type ErrorProps = {
  statusCode: any;
  hasGetInitialPropsRun: any;
  err: any;
};

export default function ErrorPage({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }
  return (
    <div className="error-page">
      <NextError statusCode={statusCode} />
      <style jsx>{`
        .error-page {
          margin-top: -150px;
          margin-bottom: -50px;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const errorInitialProps: any = await NextError.getInitialProps(context);

  const { res, err, asPath, locale } = context;

  const translations = await serverSideTranslations(locale, ['customers', 'common']);

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode !== 404) {
    if (err) {
      Sentry.captureException(err);
    } else {
      Sentry.captureException(new Error(`_error.ts getInitialProps missing data at path: ${asPath}`));
    }

    await Sentry.flush(2000);
  }
  return { props: { ...errorInitialProps, ...translations } };
};
