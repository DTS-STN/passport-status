// @ts-check
const { i18n } = require('./next-i18next.config');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://www.youtube.com; connect-src 'self' https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://*.omtrdc.net; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https://*.demdex.net https://cm.everesttech.net https://assets.adobedtm.com https://*.omtrdc.net; frame-src 'self' https://*.demdex.net;",
  },
];

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  devIndicators: false,
  env: {},
  generateBuildId: () => {
    return process.env.BUILD_ID ?? 'local';
  },
  reactStrictMode: true,
  i18n: {
    localeDetection: false,
    ...i18n,
  },
  headers: () => {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
