const toBool = (input: string | undefined) =>
  input !== undefined && input !== null && Boolean(JSON.parse(input));

const isProduction = process.env.NODE_ENV === 'production';

const apiConfig = {
  invoiceExpiryDays: 10,
  baseUrl: process.env.BASE_URL!,

  transfer: {
    accountNumber: process.env.TRANSFER_ACCOUNT_NUMBER!
  },

  rates: {
    feeBaseRate: 0.06,
    taxAmount: 0.25,
    earlyPaymentRate: 0.01
  },

  aws: {
    region: process.env.AWS_DEFAULT_REGION!,
    fileUploadBucket: process.env.AWS_FILE_UPLOAD_BUCKET!,
    accessKey: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    urlSignatureExpires: process.env.AWS_SIGNATURE_EXPIRES
      ? Number(process.env.AWS_SIGNATURE_EXPIRES!)
      : 4 * 60 * 60
  },

  intercom: {
    accessToken: process.env.INTERCOM_ACCESS_TOKEN
  },

  features: {
    zapNotifications: toBool(process.env.FEATURE_ZAP_NOTIFICATIONS!),
    analytics: toBool(process.env.FEATURE_ANALYTICS!),
    featuresEndpoint:
      process.env.GROWTHBOOK_URL ?? 'https://cdn.growthbook.io/api/features/key_deve_1b3795148f66b058',
    featuresRefreshTime: process.env.FEATURES_REFRESH_TIME
      ? Number(process.env.FEATURES_REFRESH_TIME)
      : 1000 * 60 * 10
  },

  googleAnalytics: {
    measurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!,
    uaMeasurementId: process.env.GOOGLE_ANALYTICS_UA_MEASUREMENT_ID!,
    apiSecret: process.env.GOOGLE_ANALYTICS_API_SECRET!
  },

  facebook: {
    pixelId: process.env.FACEBOOK_PIXEL_ID!,
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN!
  },

  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,

  smtp: {
    address: process.env.SMTP_ADDRESS!,
    port: Number(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASSWORD!
  },

  graphql: {
    debug: !isProduction,
    debugPermissions: toBool(process.env.DEBUG_GRAPHQL_PERMISSIONS),
    allowExternalErrors: !isProduction
  },

  prisma: {
    logQuery: toBool(process.env.DEBUG_PRISMA_QUERY!),
    logQueryParams: toBool(process.env.DEBUG_PRISMA_QUERY!)
  },

  auth0: {
    managementClientDomain: process.env.AUTH0_SERVER_DOMAIN!,
    domain: process.env.AUTH0_DOMAIN!,
    audience: process.env.AUTH0_AUDIENCE,
    systemUserIds: process.env.SYSTEM_USER_IDS,
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  },

  virkApi: {
    token: process.env.VIRK_API_TOKEN,
    baseUrl: process.env.VIRK_API_BASE_URL
  },

  economic: {
    baseUrl: process.env.E_CONOMIC_BASE_URL,
    agreementToken: process.env.E_CONOMIC_AGREEMENT_TOKEN,
    secretToken: process.env.E_CONOMIC_SECRET_TOKEN,
    snsTopicArn: process.env.ECONOMIC_SERVICE_TOPIC_ARN!,
    deductionEmail: process.env.E_CONOMIC_DEDUCTION_EMAIL!
  },

  services: {
    applicationServiceTopicArn: process.env.APPLICATION_SERVICE_TOPIC_ARN!,
    payrollServiceTopicArn: process.env.PAYROLL_SERVICE_TOPIC_ARN!
  },

  email: {
    snsTopicArn: process.env.EMAIL_SERVICE_TOPIC_ARN!
  },

  i18n: {
    debug: false // !isProduction
  },

  encryption: {
    secret: process.env.ENCRYPTION_SECRET!
  },

  sentry: {
    dsn:
      process.env.SENTRY_DSN ?? 'https://693ba925c6004f0aa7441f74d428f03b@o1294262.ingest.sentry.io/6525037',
    tracesSampleRate: Number(process.env.SENTRY_SAMPLE_RATE ?? 0.1)
  },

  uploads: {
    maxFileSize: 20 * 1024 * 1024
  }
};

export default apiConfig;
