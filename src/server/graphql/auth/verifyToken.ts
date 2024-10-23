import { JwtHeader, SigningKeyCallback, verify, VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import * as Sentry from '@sentry/nextjs';
import apiConfig from '../../../apiConfig';
import logger from '../../../utils/logger';

export interface TokenContent {
  email?: string;
  emailVerified?: boolean;
  role: string;
  externalId?: string;
  authUserId: string;
  permissions: string[];
}

interface RawContentClaims {
  email?: string;
  emailVerified?: boolean;
  role?: string;
  externalId?: string;
}

interface RawContent {
  'https://auth.factofly.com/claims'?: RawContentClaims;
  'https://auth.factofly.com/claims/email'?: string;
  'https://auth.factofly.com/claims/email_verified'?: boolean;
  'https://auth.factofly.com/claims/role'?: string;
  'https://auth.factofly.com/claims/external_id'?: string;
  permissions?: string[];
  sub?: string;
}

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${apiConfig.auth0.domain}/.well-known/jwks.json`
});

function getKey(header: JwtHeader, cb: SigningKeyCallback) {
  if (!header.kid) {
    cb(new Error('Missing kid'));
    return;
  }
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      cb(err);
    }
    const signingKey = key?.getPublicKey();
    cb(null, signingKey);
  });
}

const options = {
  audience: apiConfig.auth0.audience,
  issuer: `https://${apiConfig.auth0.domain}/`,
  algorithms: ['RS256']
} as VerifyOptions;

export default function verifyToken(token: string): Promise<TokenContent> {
  return new Promise((resolve, reject) => {
    try {
      verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        if (!decoded) {
          return reject(new Error('No decoded content'));
        }
        const decodedContent = decoded as RawContent;
        const permissions = decodedContent?.permissions || [];
        const authUserId = decodedContent?.sub;

        let { email, emailVerified, externalId, role } =
          decodedContent?.['https://auth.factofly.com/claims'] || {};

        if (!email) {
          email = decodedContent?.['https://auth.factofly.com/claims/email'];
        }
        if (!emailVerified) {
          emailVerified = decodedContent?.['https://auth.factofly.com/claims/email_verified'];
        }
        if (!externalId) {
          externalId = decodedContent?.['https://auth.factofly.com/claims/external_id'];
        }
        if (!role) {
          role = decodedContent?.['https://auth.factofly.com/claims/role'];
        }

        if (permissions?.length && email && emailVerified !== undefined && role && authUserId) {
          return resolve({ permissions, email, emailVerified, externalId, role, authUserId });
        }

        if (authUserId && apiConfig.auth0.systemUserIds!?.indexOf(authUserId) > -1) {
          return resolve({ permissions, authUserId, role: 'SYSTEM' });
        }

        throw new Error('Missing decoded fields');
      });
    } catch (e: unknown) {
      Sentry.captureException(e);
      logger.error(`auth/verifyToken.ts: ${e}`);
      reject(new Error('Verified token failed'));
    }
  });
}
