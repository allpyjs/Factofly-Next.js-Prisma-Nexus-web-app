// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';
import clientConfig from './src/clientConfig';

Sentry.init({
  dsn: clientConfig.sentry.dsn,
  integrations: [
    new CaptureConsole({
      levels: ['error']
    }),
    new Sentry.BrowserTracing({
      // custom options
    })
  ],
  tracesSampleRate: clientConfig.sentry.tracesSampleRate,
  tracesSampler: (samplingContext) => {
    // Examine provided context data (including parent decision, if any) along
    // with anything in the global namespace to compute the sample rate or
    // sampling decision for this transaction

    if (samplingContext.location.search.includes('sample=true')) {
      return 1;
    }
    // if ('...') {
    //   // These are less important or happen much more frequently - only take 1%
    //   return 0.01;
    // }
    // if ('...') {
    //   // These aren't something worth tracking - drop all transactions like this
    //   return 0;
    // }
    return clientConfig.sentry.tracesSampleRate;
  }
});
