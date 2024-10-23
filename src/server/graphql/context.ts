import { getSession } from '@auth0/nextjs-auth0';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { ApolloError } from 'apollo-server-core';
import * as Sentry from '@sentry/nextjs';
import logger from '../../utils/logger';
import prisma from '../utils/prismaClient';
import { getTokenClaims } from './auth/getTokenClaims';
import auth from './auth/auth';
import { IContextData } from './IContextData';
import i18NextServer from '~/server/utils/i18NextServer';
import durationInMs from '../utils/durationInMs';
import { DataSources } from './datasources';

export interface Context extends IContextData {
  dataSources: DataSources;
}

export interface GraphQLContext extends Context {}

const context = async ({ req, res }: { req: MicroRequest; res: ServerResponse }): Promise<IContextData> => {
  const start = process.hrtime.bigint();
  let user;
  let authToken;

  try {
    const session = await getSession(req, res);
    const sessionUser = session?.user;

    let email;

    if (sessionUser) {
      // authenticated via cookie
      email = sessionUser.email;
      authToken = sessionUser;
    } else if (req?.headers?.authorization) {
      // authenticated via auth token
      const tokenClaims = await getTokenClaims(req.headers.authorization!);
      email = tokenClaims.email;
      authToken = tokenClaims;
    }

    if (email) {
      user = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (user) {
        Sentry.setUser({ id: user.id.toString(), role: user.role });
      }
    }
  } catch (err: any) {
    logger.error({ msg: `graphql/context.ts: ${err.message.split('\n')[0]}`, error: err });
    throw new ApolloError('Error retrieving authenticated user details', 'UNAUTHENTICATED');
  }

  const requestStartTime = BigInt(req?.headers['x-request-start']!.toString());
  const end = process.hrtime.bigint();

  logger.info(
    `graphql/context.ts: graphql context created in ${durationInMs(start, end)}ms at t+${durationInMs(
      requestStartTime,
      end
    )}ms`
  );

  return {
    authToken,
    user,
    prisma,
    auth,
    requestId: req?.headers['x-request-id']?.toString(),
    requestStartTime,
    i18n: i18NextServer
  };
};

export default context;
