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
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales')
      : '/public/locales',
  returnNull: false,
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
  },
}
