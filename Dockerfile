# Install dependencies only when needed -----------------------------
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma

RUN pnpm install --filter "@factofly/web-app"

# Rebuild the source code only when needed --------------------------------
FROM node:16-alpine AS builder

RUN apk add --no-cache curl bash
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="2.4.0" bash

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# copy the sentry properties so that the source maps can be uploaded to sentry
COPY sentry.properties.docker ./sentry.properties

ARG SENTRY_AUTH_TOKEN
ARG SENTRY_SAMPLE_RATE
ARG SENTRY_DSN

ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN

ARG BASE_URL
ARG GOOGLE_TAG_MANAGER_ID
ARG SUPPORT_EMAIL
ARG NODE_ENV

ENV NEXT_PUBLIC_BASE_URL=$BASE_URL
ENV NEXT_PUBLIC_AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
ENV NEXT_PUBLIC_AUTH0_DOMAIN=$AUTH0_DOMAIN
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=$GOOGLE_TAG_MANAGER_ID
ENV NEXT_PUBLIC_SUPPORT_EMAIL=$SUPPORT_EMAIL
ENV NEXT_PUBLIC_REDIRECT_URI=${BASE_URL}/api/callback
ENV NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI=$BASE_URL
ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_SAMPLE_RATE=$SENTRY_SAMPLE_RATE

# fix for PrismaClientInitializationError message
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm build

# Production image, copy all the files and run next ------------------------------
FROM node:16-alpine AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/local/bin/sentry-cli ../usr/local/bin/sentry-cli

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/sentry.server.config.js ./sentry.server.config.js
COPY --from=builder /app/sentry.client.config.js ./sentry.client.config.js
COPY --from=builder /app/sentry.properties ./sentry.properties

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
