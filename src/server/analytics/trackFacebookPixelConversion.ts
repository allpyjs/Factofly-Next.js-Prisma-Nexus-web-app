/* eslint-disable no-underscore-dangle */
import crypto from 'crypto';
import apiConfig from '~/apiConfig';
import logger from '~/utils/logger';

export default async function trackFacebookPixelConversion(
  email: string,
  ip: string,
  userAgent: string,
  cookies: { [key: string]: string }
) {
  const { pixelId, accessToken } = apiConfig.facebook;
  const emailHash = crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
  const pixelResult = await fetch(
    `https://graph.facebook.com/v13.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [
          {
            event_name: 'CompleteRegistration',
            event_time: Math.floor(new Date().getTime() / 1000),
            event_source_url: apiConfig.baseUrl,
            action_source: 'website',
            user_data: {
              client_ip_address: ip,
              client_user_agent: userAgent,
              fbp: cookies._fbp,
              fbc: cookies._fbc,
              em: emailHash
            }
          }
        ]
      })
    }
  );

  if (pixelResult.status !== 200) {
    logger.error('trackRegistration.ts: Error tracking user registration via facebook pixel', {
      result: await pixelResult.text()
    });
  }
}
