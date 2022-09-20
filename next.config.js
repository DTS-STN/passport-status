//formatting TC Date
const builddate = process.env.BUILD_DATE
  ? process.env.BUILD_DATE.substring(0, 4) +
    '-' +
    process.env.BUILD_DATE.substring(4, 6) +
    '-' +
    process.env.BUILD_DATE.substring(6, 8)
  : 'DATE-NA'

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
      "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; script-src-elem 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:",
  },
]

module.exports = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: builddate,
    LOGGING_LEVEL: process.env.LOGGING_LEVEL,
  },
  reactStrictMode: true,
  //
  // i18n setup
  //
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  //
  // rewrites setup
  //
  // async rewrites() {
  //   return [
  //     {
  //       source: '/accueil',
  //       destination: '/home',
  //     },
  //     // {
  //     //   source: " french page name with/without route ",
  //     //   destination: " 'english' page ",
  //     // },
  //   ]
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
