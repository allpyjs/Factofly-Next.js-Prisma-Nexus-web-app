const isProduction = process.env.NODE_ENV === 'production';

const clientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  i18n: {
    debug: !isProduction
  },

  sentry: {
    dsn:
      process.env.NEXT_PUBLIC_SENTRY_DSN ??
      'https://693ba925c6004f0aa7441f74d428f03b@o1294262.ingest.sentry.io/6525037',
    tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE ?? 0.1)
  }
};

export default clientConfig;
