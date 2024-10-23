// This is based on ActiveRecord::Encryption from Ruby on Rails.

import crypto from 'crypto';
import logger from '~/utils/logger';
import apiConfig from '../../apiConfig';

const ENCRYPTION_ALRGORITHM = 'aes-256-gcm';

type EncryptionArgs = { secret: string; originalData: string };

export const encrypt = ({ secret, originalData }: EncryptionArgs) => {
  const iv = crypto.randomBytes(16);
  const crypt = crypto.createCipheriv(ENCRYPTION_ALRGORITHM, Buffer.from(secret, 'base64'), iv);

  let encoded = crypt.update(originalData, 'utf8', 'base64');
  encoded += crypt.final('base64');
  const at = crypt.getAuthTag();
  return { encrypted: encoded, iv: iv.toString('base64'), at: at.toString('base64') };
};

type DecryptionArgs = {
  secret: string;
  encryptedData: string;
  iv: string;
  at: string;
};

export const decrypt = ({ secret, encryptedData, iv, at }: DecryptionArgs) => {
  if (!secret) return '';
  try {
    const crypt = crypto.createDecipheriv(
      ENCRYPTION_ALRGORITHM,
      Buffer.from(secret, 'base64'),
      Buffer.from(iv, 'base64')
    );
    crypt.setAuthTag(Buffer.from(at, 'base64'));
    let decoded = crypt.update(encryptedData, 'base64', 'utf8');
    decoded += crypt.final('utf8');
    return decoded;
  } catch (err) {
    logger.error('Error decrypting record');
    return '';
  }
};

type GenerateChecksumOptions = {
  algorithm?: string;
  encoding?: 'hex' | 'base64';
};

export function generateChecksum(data: any, { algorithm, encoding }: GenerateChecksumOptions = {}) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(data, 'utf8')
    .digest(encoding || 'base64');
}

export const encryptRecord = (originalData: string) => {
  const result = encrypt({ secret: apiConfig.encryption.secret, originalData });
  return JSON.stringify({ p: result.encrypted, h: { iv: result.iv, at: result.at } });
};

export const decryptRecord = (encryptedData: string) => {
  const parsedData = JSON.parse(encryptedData);
  return decrypt({
    secret: apiConfig.encryption.secret,
    encryptedData: parsedData.p,
    iv: parsedData.h.iv,
    at: parsedData.h.at
  });
};
