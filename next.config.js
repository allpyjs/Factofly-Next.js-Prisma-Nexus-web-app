/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});
const { i18n } = require('./next-i18next.config');

// https://github.com/getsentry/sentry-webpack-plugin#options
const sentryWebpackPluginOptions = {
  silent: false, // Suppresses all logs
  debug: true
};

const nextConfig = {
  i18n,
  experimental: {
    outputStandalone: true
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src']
  },
  env: {
    ROOT_DIR: __dirname
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });
    // eslint-disable-next-line no-param-reassign
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/users/sign_up',
        destination: '/api/auth/login/?screen_hint=signup',
        permanent: true
      },
      {
        source: '/users/sign_in',
        destination: '/api/auth/login',
        permanent: true
      }
    ];
  }
};

module.exports = withBundleAnalyzer(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
