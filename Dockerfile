FROM node:18.9-alpine3.15 AS base
WORKDIR /base
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS build

# Build envs
ARG BUILD_DATE
ENV BUILD_DATE=$BUILD_DATE
ARG ENV_EXAMPLE
ENV ENV_EXAMPLE=$ENV_EXAMPLE
ARG NEXT_PUBLIC_ENV_EXAMPLE
ENV NEXT_PUBLIC_ENV_EXAMPLE=$NEXT_PUBLIC_ENV_EXAMPLE

ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:18.9-alpine3.15 AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/next.config.js ./
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/tracing.js ./
RUN VERSION_NEXT=`node -p -e "require('./package.json').dependencies.next"`&& npm install --no-package-lock --no-save next@"$VERSION_NEXT"

# Runtime envs -- will default to build args if no env values are specified at docker run
ARG ENV_EXAMPLE
ENV ENV_EXAMPLE=$ENV_EXAMPLE
ARG NEXT_PUBLIC_ENV_EXAMPLE
ENV NEXT_PUBLIC_ENV_EXAMPLE=$NEXT_PUBLIC_ENV_EXAMPLE

CMD npm run start
