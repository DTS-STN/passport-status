ARG BASE_IMAGE=docker.io/node:22.11.0-bookworm-slim
FROM $BASE_IMAGE AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app


# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BUILD_DATE
ARG BUILD_ID

ENV BUILD_DATE=$BUILD_DATE
ENV BUILD_ID=$BUILD_ID
ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next

# next-i18next
# https://github.com/i18next/next-i18next#docker
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# install next.js
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts

USER node

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
