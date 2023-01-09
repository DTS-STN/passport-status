import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultSeo } from 'next-seo'
import { getNextSEOConfig } from '../next-seo.config'
import Head from 'next/head'
import getConfig from 'next/config'

import '../styles/globals.css'

// Create a react-query client
const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const config = getConfig()
  const appBaseUri = config?.publicRuntimeConfig?.appBaseUri
  const nextSEOConfig = getNextSEOConfig(appBaseUri, router)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...nextSEOConfig} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
