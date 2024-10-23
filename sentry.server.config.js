// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import * as Tracing from '@sentry/tracing';
import apiConfig from './src/apiConfig';
import prismaClient from './src/server/utils/prismaClient';

Sentry.init({
  dsn: apiConfig.sentry.dsn,
  tracesSampleRate: apiConfig.sentry.tracesSampleRate,
  integrations: [
    new Tracing.Integrations.Prisma({ client: prismaClient })
    // , new Tracing.Integrations.Apollo()
  ]
});
