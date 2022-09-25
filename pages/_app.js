import '../styles/globals.css'
import Layout from '../components/Layout'
import en from '../locales/en'
import fr from '../locales/fr'

export default function MyApp({ Component, pageProps, router }) {
  const { locale } = router
  let langToggleLink = ''

  if (locale === 'en') {
    langToggleLink = '/fr'
    pageProps.commonContent = en
  } else {
    pageProps.commonContent = fr
  }

  langToggleLink = langToggleLink + router.asPath

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  /* istanbul ignore next */
  return (
    <Layout locale={locale} langToggleLink={langToggleLink}>
      <Component {...pageProps} />
    </Layout>
  )
}
