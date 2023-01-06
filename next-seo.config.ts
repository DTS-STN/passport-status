import { DefaultSeoProps } from 'next-seo'
import { OpenGraphMedia } from 'next-seo/lib/types'
import { Router } from 'next/router'

export type NextSEORouter = Pick<Router, 'asPath' | 'locale'>

export interface LanguageAlternate {
  hrefLang: string
  href: string
}

export const getLanguageAlternates = (
  appBaseUri: string,
  router: NextSEORouter
): ReadonlyArray<LanguageAlternate> | undefined => {
  if (!appBaseUri) return
  return [
    {
      hrefLang: 'en',
      href: `${appBaseUri}/en${router.asPath}`,
    },
    {
      hrefLang: 'fr',
      href: `${appBaseUri}/fr${router.asPath}`,
    },
  ]
}

export const getOpenGraphImages = (
  appBaseUri: string
): ReadonlyArray<OpenGraphMedia> | undefined => {
  if (!appBaseUri) return
  return [
    {
      url: `${appBaseUri}/ogp.jpg`,
      width: 2048,
      height: 1152,
    },
  ]
}

export type GetNextSEOConfig = (
  appBaseUri: string,
  router: NextSEORouter
) => DefaultSeoProps

export const getDefaultConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate:
    "%s \u2010 Check the status of your passport application | Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
  defaultTitle:
    "Check the status of your passport application | Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
  description:
    "Check the status of your passport application. | Vérifiez l'état de votre demande de passeport.",
  additionalMetaTags: [
    {
      name: 'author',
      content:
        'Immigration, Refugees and Citizenship Canada | Immigration, Réfugiés et Citoyenneté Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content:
        'Immigration, Refugees and Citizenship Canada | Immigration, Réfugiés et Citoyenneté Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    { name: 'dcterms.spatial', content: 'Canada' },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName:
      "Check the status of your passport application | Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
    type: 'website',
  },
  twitter: {
    site: '@CitImmCanada',
    cardType: 'summary_large_image',
  },
})

export const getEnglishConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate:
    '%s \u2010 Check the status of your passport application \u2010 Canada.ca',
  defaultTitle:
    'Check the status of your passport application \u2010 Canada.ca',
  description: 'Check the status of your passport application.',
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Immigration, Refugees and Citizenship Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Immigration, Refugees and Citizenship Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    { name: 'dcterms.spatial', content: 'Canada' },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName: 'Check the status of your passport application \u2010 Canada.ca',
    type: 'website',
  },
  twitter: {
    site: '@CitImmCanada',
    cardType: 'summary_large_image',
  },
})

export const getFrenchConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate:
    "%s \u2010 Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
  defaultTitle:
    "Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
  description: "Vérifiez l'état de votre demande de passeport.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Immigration, Réfugiés et Citoyenneté Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Immigration, Réfugiés et Citoyenneté Canada',
    },
    { name: 'dcterms.language', content: 'fra' },
    { name: 'dcterms.spatial', content: 'Canada' },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'fr_CA',
    siteName: "Vérifiez l'état de votre demande de passeport \u2010 Canada.ca",
    type: 'website',
  },
  twitter: {
    site: '@citimmcanfr',
    cardType: 'summary_large_image',
  },
})

export const getNextSEOConfig: GetNextSEOConfig = (appBaseUri, router) => {
  const { locale } = router
  if (locale === 'en') return getEnglishConfig(appBaseUri, router)
  if (locale === 'fr') return getFrenchConfig(appBaseUri, router)
  return getDefaultConfig(appBaseUri, router)
}
