import React, { useCallback, useEffect, useMemo } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import * as Sentry from '@sentry/nextjs';
import UserContext, { IUserContext } from './UserContext';
import UserContextProviderQuery from './graphql/UserContextProviderQuery.gql';
import { GetLoggedInUser, GetLoggedInUser_me } from './graphql/.generated/GetLoggedInUser';
import { RoleEnum } from '~/.generated/globalTypes';
import LoadingPage from '~/features/shared/components/LoadingPage';
import ImpersonateUserQuery from './graphql/ImpersonateUserQuery.gql';
import useLocalStorage from '~/features/shared/hooks/useLocalStorage';

const setLocaleCookie = (locale: string) => {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
};

interface UserProviderProps {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserProviderProps): JSX.Element {
  const { data, loading, error } = useQuery<GetLoggedInUser>(UserContextProviderQuery);
  const [getUser] = useLazyQuery(ImpersonateUserQuery);
  const [impersonatedUser, setImpersonatedUser] = useLocalStorage('impersonated-user', null);
  const router = useRouter();
  const { i18n } = useTranslation();

  const impersonateUser = useCallback(
    (userId?: number) => {
      getUser({
        variables: { where: { id: userId } },
        onCompleted: (result) => {
          setImpersonatedUser(result?.user);
        }
      });
    },
    [getUser, setImpersonatedUser]
  );

  const clearImpersonatedUser = useCallback(() => {
    setImpersonatedUser(null);
  }, [setImpersonatedUser]);

  const context: IUserContext = useMemo(() => {
    Sentry.setUser({ id: data?.me.id, role: data?.me.role });
    const user: GetLoggedInUser_me = impersonatedUser ?? data?.me;
    const isImpersonating = !!impersonatedUser;

    return {
      ...user,
      error,
      features: user?.features ?? undefined,
      phoneNumber: user?.phoneNumber ?? undefined,
      referral: user?.referral ?? undefined,
      availableCredits: user?.availableCredits ?? undefined,
      referralLinkCode: user?.referralLinkCode ?? undefined,
      accountSetupComplete: user?.accountSetupComplete ?? undefined,
      language: user?.language ?? undefined,
      locale: user?.locale ?? undefined,
      loading,
      isUser: user?.role === RoleEnum.USER,
      isAdmin: user?.role === RoleEnum.ADMIN,
      isImpersonating,
      originalUser: isImpersonating
        ? { id: data?.me.id, isAdmin: data?.me.role === RoleEnum.ADMIN }
        : undefined,
      impersonateUser,
      clearImpersonatedUser
    };
  }, [data, loading, error, impersonatedUser, clearImpersonatedUser, impersonateUser]);

  // switch the user's language via next locale
  useEffect(() => {
    if (context.language) {
      const nextLocale = context.language.toLowerCase();
      if (nextLocale !== i18n.language) {
        setLocaleCookie(nextLocale);
        const { pathname, asPath, query } = router;
        // eslint-disable-next-line no-console
        console.log(`switching language from ${i18n.language} to ${nextLocale}`);
        router.push({ pathname, query }, asPath, { locale: nextLocale });
      }
    }
  }, [context.language, router, i18n]);

  const { pathname } = router;

  // if there's an error, then redirect to the error page
  if (context && !context.loading && error && pathname !== '/error') {
    router.push('/error');
    return <LoadingPage />;
  }

  // redirect to verify email page if the email has not been verified
  if (context && !context.loading && !error && !context.emailVerified && pathname !== '/verify-email') {
    router.push('/verify-email');
    return <LoadingPage />;
  }

  // if the email has been verified, redirect away from the verify email page.
  if (context && !context.loading && context.emailVerified && pathname === '/verify-email') {
    router.push('/');
    return <LoadingPage />;
  }

  if (loading) return <LoadingPage />;

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
