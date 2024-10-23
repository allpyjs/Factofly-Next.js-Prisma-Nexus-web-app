/* eslint-disable no-underscore-dangle */
import * as Sentry from '@sentry/nextjs';
import apiConfig from '~/apiConfig';
import logger from '~/utils/logger';
import trackGoogleAnalytics from './trackGoogleAnalytics';
import trackFacebookPixelConversion from './trackFacebookPixelConversion';

export default async function trackRegistration(
  email: string,
  cookies: { [key: string]: string },
  ip: string,
  userAgent: string,
  referralId?: string
) {
  if (apiConfig.features.analytics) {
    try {
      logger.info('trackRegistration.ts: tracking registration for facebook/google ad conversion.');
      await Promise.all([
        trackGoogleAnalytics(cookies, referralId, userAgent),
        trackFacebookPixelConversion(email, ip, userAgent, cookies)
      ]);
    } catch (err) {
      Sentry.captureException(err);
      logger.error(`trackRegistration.ts: Error tracking user registration ${err}`);
    }
  }
}
