// @ts-check
const path = require('path')

/**
 * @type {import('next-i18next').UserConfig}
 **/
module.exports = {
  i18n: {
    locales: ['default', 'en', 'fr'],
    defaultLocale: 'default',
  },
  appendNamespaceToMissingKey: true,
  localePath: path.resolve('./public/locales'),
  returnNull: false,
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
