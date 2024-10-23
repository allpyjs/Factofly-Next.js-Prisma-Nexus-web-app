import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { LOGIN_PAGE } from '~/constants/appRoutes';
import LoadingPage from './LoadingPage';

// check if you are on the client (browser) or server
const isBrowser = () => typeof window !== 'undefined';

type ProtectedRouteProps = {
  router: any;
};

function ProtectedRoute({ router, children }: React.PropsWithChildren<ProtectedRouteProps>): JSX.Element {
  // Identify authenticated user
  const { user, isLoading } = useUser();
  const { query } = useRouter();
  const isAuthenticated = !!user;

  const unprotectedRoutes: string[] = [
    LOGIN_PAGE
    // appRoutes.FORGOT_PASSWORD,
    // appRoutes.RESET_PASSWORD,
    // appRoutes.EMAIL_SENT,
    // appRoutes.VERIFY_EMAIL,
    // appRoutes.NEWS_FEED_PAGE,
    // appRoutes.CONTENT_DETAILS_PAGE,
    // appRoutes.ABOUT_US_PAGE,
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isLoading && !isAuthenticated && pathIsProtected) {
    let loginUrl = LOGIN_PAGE + (query.referral_id ? `?referral_id=${query.referral_id}` : '');
    if (query.screen_hint) {
      loginUrl += `${loginUrl.includes('?') ? '&' : '?'}screen_hint=${query.screen_hint}`;
    }
    if (query.login_hint) {
      loginUrl += `${loginUrl.includes('?') ? '&' : '?'}login_hint=${query.login_hint}`;
    }
    router.push(loginUrl);
    return <LoadingPage />;
  }

  if (isLoading) return <LoadingPage />;

  return children as JSX.Element;
}

export default ProtectedRoute;
