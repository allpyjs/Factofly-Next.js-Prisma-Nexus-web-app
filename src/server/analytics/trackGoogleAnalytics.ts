/* eslint-disable no-underscore-dangle */
import apiConfig from '~/apiConfig';
import logger from '~/utils/logger';
import buildParamString from './buildParamString';

// https://developers.google.com/analytics/devguides/collection/protocol/ga4
// https://ga-dev-tools.web.app/ga4/event-builder/
export default async function trackGoogleAnalytics(
  cookies: { [key: string]: string },
  referralId: string | undefined,
  userAgent: string
) {
  const { measurementId, apiSecret } = apiConfig.googleAnalytics;

  if (cookies?._ga) {
    const clientId = cookies?._ga.split('.').slice(-2).join('.');

    const gaResult = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: 'sign_up',
              params: {}
            }
          ]
        })
      }
    );

    if (gaResult.status !== 204) {
      logger.error('trackRegistration.ts: Error tracking user registration via google analytics', {
        result: await gaResult.text()
      });
    }

    // google universal analytics
    const { uaMeasurementId } = apiConfig.googleAnalytics;
    const analyticsHitBody = buildParamString({
      v: 1,
      t: 'event',
      tid: uaMeasurementId,
      cid: clientId,

      ec: 'Signup',
      ea: referralId ?? 'Signup',
      ua: userAgent
    });
    const uaResult = await fetch(`https://www.google-analytics.com/collect`, {
      method: 'POST',
      body: analyticsHitBody
    });

    if (uaResult.status !== 200) {
      logger.error('trackRegistration.ts: Error tracking user registration via google UA', {
        result: await uaResult.text()
      });
    }
  }
}
