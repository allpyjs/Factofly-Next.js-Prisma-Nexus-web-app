import { handleAuth, handleCallback, handleLogin, getSession } from '@auth0/nextjs-auth0';
import * as Sentry from '@sentry/nextjs';
import apiConfig from '~/apiConfig';
import getIpAddress from '~/server/utils/getIpAddress';
import sendNewUserNotification from '~/server/utils/sendNewUserNotification';
import trackReferralRewards from '~/server/utils/trackReferralRewards';
import trackRegistration from '~/server/analytics/trackRegistration';
import prisma from '../../../src/server/utils/prismaClient';
import logger from '../../../src/utils/logger';

export default handleAuth({
  async login(req, res) {
    try {
      // Pass in custom params to your handler
      await handleLogin(req, res, {
        authorizationParams: {
          referral_id: req.query.referral_id,
          screen_hint: req.query.screen_hint as string,
          login_hint: req.query.login_hint as string
        }
      });
      // Add your own custom logging.
      logger.info('Redirecting to login');
    } catch (error: any) {
      // Add you own custom error logging.
      Sentry.captureException(error);
      logger.error(error);
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res);

      // Auth0 doesn't let us access the cookies we need for tracking FB and Google ad conversions,
      // so we need to track whether a registration event has been recorded for this user manually.
      const session = getSession(req, res);
      if (session?.user && session?.user.email) {
        const user = await prisma.user.findFirst({ where: { email: session.user.email } });

        if (user && !user.conversionTracked) {
          try {
            const registration = trackRegistration(
              user.email,
              req.cookies,
              getIpAddress(req),
              req.headers['user-agent']!,
              user.referral ?? undefined
            );

            const notification = sendNewUserNotification(user);

            const referralRewards = trackReferralRewards(user);

            await Promise.all([registration, notification, referralRewards]);

            await prisma.user.update({
              data: { conversionTracked: true },
              where: { email: user.email }
            });
          } catch (error: any) {
            logger.error(error);
            Sentry.captureException(error);
          }
        }
      }
    } catch (error: any) {
      logger.error(error);
      Sentry.captureException(error);
      res.redirect(apiConfig.baseUrl);
    }
  }
});
