import '../styles/globals.css'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  let router = useRouter()
  router ??= {}
  let langToggleLink = (pageProps.locale === 'en' ? '/fr' : '') + router.asPath

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
