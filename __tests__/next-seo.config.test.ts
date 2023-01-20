import '@testing-library/jest-dom'
import { OpenGraphMedia } from 'next-seo/lib/types'
import {
  getLanguageAlternates,
  getNextSEOConfig,
  getOpenGraphImages,
  LanguageAlternate,
  NextSEORouter,
} from '../next-seo.config'

describe('getNextSEOConfig', () => {
  it('should call getDefaultConfig when router.locale is empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: '' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe(
      "Passport application status checker | Outil de vérification de l'état de la demande de passeport"
    )
  })

  it('should call getEnglishConfig when router.locale is `en`', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: 'en' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe('Passport application status checker')
  })

  it('should call getFrenchConfig when router.locale is `fr`', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '', locale: 'fr' }

    // act
    const act = getNextSEOConfig(appBaseUri, router)

    // assert
    expect(act.description).toBe(
      "Outil de vérification de l'état de la demande de passeport"
    )
  })
})

describe('getLanguageAlternates', () => {
  it('should return undefined when appBaseUri is empty', () => {
    // arrange
    const appBaseUri = ''
    const router: NextSEORouter = { asPath: '', locale: '' }

    // act
    const act = getLanguageAlternates(appBaseUri, router)

    // assert
    expect(act).toBeUndefined()
  })

  it('should return language alternate links when appBaseUri is not empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'
    const router: NextSEORouter = { asPath: '/home', locale: '' }

    // act
    const act = getLanguageAlternates(appBaseUri, router)

    // assert
    expect(act).not.toBeUndefined()
    expect(act).toStrictEqual([
      {
        href: 'https://example.com/en/home',
        hrefLang: 'en',
      },
      {
        href: 'https://example.com/fr/home',
        hrefLang: 'fr',
      },
    ] as ReadonlyArray<LanguageAlternate>)
  })
})

describe('getOpenGraphImages', () => {
  it('should return undefined when appBaseUri is empty', () => {
    // arrange
    const appBaseUri = ''

    // act
    const act = getOpenGraphImages(appBaseUri)

    // assert
    expect(act).toBeUndefined()
  })

  it('should return open graph images when appBaseUri is not empty', () => {
    // arrange
    const appBaseUri = 'https://example.com'

    // act
    const act = getOpenGraphImages(appBaseUri)

    // assert
    expect(act).not.toBeUndefined()
    expect(act).toStrictEqual([
      {
        url: 'https://example.com/ogp.jpg',
        width: 2048,
        height: 1152,
      },
    ] as ReadonlyArray<OpenGraphMedia>)
  })
})
