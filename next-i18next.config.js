// @ts-check
const path = require('path')

/**
 * @type {import('next-i18next').UserConfig}
 **/
module.exports = {
  i18n: {
    locales: ['default', 'en', 'fr'],
    defaultLocale: 'default',
    localePath: path.resolve('./public/locales'),
  },
  appendNamespaceToMissingKey: true,
  returnNull: false,
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
