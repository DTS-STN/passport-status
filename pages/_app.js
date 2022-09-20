import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  /* istanbul ignore next */
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  /* istanbul ignore next */
  return (
    <Layout
      locale={pageProps.locale}
      meta={pageProps.meta}
      langToggleLink={pageProps.langToggleLink}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
