import { i18n } from 'i18next';
import { PrismaClient, User } from '~/server/utils/prismaClient';
import { TokenClaims } from './auth/getTokenClaims';

export interface IContextData {
  prisma: PrismaClient;
  user?: User | null;
  authToken?: TokenClaims;
  i18n: i18n;
  requestId?: string;
  requestStartTime: bigint;

  auth: {
    isEmployee: (user: User | null) => boolean;
    isAdmin: (user: User | null) => boolean;
    isUser: (user: User | null) => boolean;
    notSystem: (user: User | null, machine: { role: string } | null) => boolean;
    isSystem: (machine: { role: string } | null) => boolean;
  };
}
