/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import clientConfig from '~/clientConfig';
import useUser from '~/contexts/User/useUser';

const Debug: NextPage = () => {
  const { isAdmin } = useUser();

  if (!isAdmin) return <div />;
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>Debug</h1>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2>Client Config Settings</h2>
          <pre className="border p-2">{JSON.stringify(clientConfig, null, 4)}</pre>
          <br />
          <button
            className="btn btn-danger my-2"
            type="button"
            id="test-button"
            onClick={() => {
              throw new Error('This is a test error');
            }}
          >
            Test Error Handling
          </button>
        </div>
      </div>
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

export default Debug;
