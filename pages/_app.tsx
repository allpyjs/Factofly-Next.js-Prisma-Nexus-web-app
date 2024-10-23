import '../styles/hyper/app.scss';
import '../styles/hyper/icons.scss';
import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import 'intl-pluralrules';
import { appWithTranslation } from 'next-i18next';
import DefaultLayout from '~/layouts/DefaultLayout';
import RedirectToLogin from '~/features/shared/components/RedirectToLogin';
import UserContextProvider from '~/contexts/User/UserContextProvider';
import { useApollo } from '~/utils/apolloClient';
import GoogleTagManager from '~/features/shared/components/GoogleTagManager';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Auth0UserProvider>
      <RedirectToLogin router={router}>
        <ApolloProvider client={apolloClient}>
          <UserContextProvider>
            <GoogleTagManager />
            <SnackbarProvider maxSnack={3}>
              <DefaultLayout>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </DefaultLayout>
            </SnackbarProvider>
          </UserContextProvider>
        </ApolloProvider>
      </RedirectToLogin>
    </Auth0UserProvider>
  );
}

export default appWithTranslation(MyApp);
