import '../styles/globals.css'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import en from '../locales/en'
import fr from '../locales/fr'

function MyApp({ Component, pageProps }) {
  let router = useRouter()
  router ??= {}
  let langToggleLink = ''

  if (pageProps.locale === 'en') {
    pageProps.commonContent = en
  } else {
    langToggleLink = '/fr'
    pageProps.commonContent = fr
  }
  langToggleLink = langToggleLink + router.asPath

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  /* istanbul ignore next */
  return (
    <Layout locale={pageProps.locale} langToggleLink={langToggleLink}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
