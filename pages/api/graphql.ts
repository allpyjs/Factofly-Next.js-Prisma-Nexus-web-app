import * as Sentry from '@sentry/nextjs';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import Cors from 'micro-cors';
import { nanoid } from 'nanoid';
import createGraphQLHandler from '../../src/server/graphql/createGraphQLHandler';
import logger from '../../src/utils/logger';

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
  allowHeaders: ['sentry-trace', 'baggage']
});

export const config = {
  api: {
    bodyParser: false,
    /** *
     * [sentry] If Next.js logs a warning "API resolved without sending a response", it's a false positive, which we're working to rectify.
            In the meantime, to suppress this warning, set `SENTRY_IGNORE_API_RESOLUTION_ERROR` to 1 in your env.
            To suppress the nextjs warning, use the `externalResolver` API route option (see https://nextjs.org/docs/api-routes/api-middlewares#custom-config for details).
     */
    externalResolver: true
  }
};

async function handler(req: MicroRequest, res: ServerResponse) {
  const start = process.hrtime.bigint();
  let requestId = req.headers['x-request-id']?.toString();
  req.headers['x-request-start'] = start.toString();
  if (!requestId) {
    requestId = nanoid();
    req.headers['x-request-id'] = requestId;
  }

  Sentry.configureScope((scope: any) => {
    scope.setTag('request_id', requestId);
  });

  logger.info(`pages/api/graphql.ts: ${req.method} /api/graphql request (requestId=${requestId}) started`);

  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await createGraphQLHandler(req, res);
  return true;
}

export default cors(handler);
