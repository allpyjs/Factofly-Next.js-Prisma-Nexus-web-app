import logger from '../../../utils/logger';
import verifyToken from './verifyToken';

export type TokenClaims = {
  permissions?: string[];
  email?: string;
  emailVerified?: boolean;
  externalId?: string;
  role?: string;
  authUserId?: string;
};

export const getTokenClaims = async (rawToken: string): Promise<TokenClaims> => {
  if (!rawToken?.startsWith('Bearer ')) {
    throw new Error('Missing auth protocol');
  }

  const token = rawToken.replace(/^Bearer\s+/, '');
  if (!token) {
    throw new Error('Missing token');
  }

  const tokenClaims = await verifyToken(token).catch((error: Error) => {
    logger.error(error);
    throw new Error('Invalid token provided');
  });

  if (!tokenClaims?.email) {
    throw new Error('Invalid token provided - Missing email');
  }

  if (!tokenClaims?.emailVerified) {
    throw new Error('Invalid token provided - Email not verified');
  }

  return tokenClaims;
};
