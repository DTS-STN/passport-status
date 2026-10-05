import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next/pages';
import { generateDefaultSeo } from 'next-seo/pages';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import nextI18NextConfig from '../../next-i18next.config.js';
import { ClientEnvironment, ClientEnvironmentProvider } from '../context/ClientEnvironmentContext';
import { AppWindow } from '../lib/types';
import { lato, notoSans } from '../lib/utils/fonts';
import { getNextSEOConfig } from '../next-seo.config';
import '../styles/globals.css';

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// help to prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = '';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const { ADOBE_ANALYTICS_SCRIPT_SRC, APP_BASE_URI }: ClientEnvironment = pageProps.clientEnvironment;

  const nextSEOConfig = getNextSEOConfig(APP_BASE_URI, router);

  /** Web Analytics - taken from Google Analytics example
   *  @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
   * */
  useEffect(() => {
    const handleRouteChange = () => {
      // only push event if pathname is different
      if (window.location.pathname !== appPreviousLocationPathname) {
        (window as AppWindow).adobeDataLayer?.push?.({ event: 'pageLoad' });
        appPreviousLocationPathname = window.location.pathname;
      }
    };

    handleRouteChange();
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        :root {
          --font-lato: ${lato.style.fontFamily};
          --font-noto-sans: ${notoSans.style.fontFamily};
        }
      `}</style>

      {ADOBE_ANALYTICS_SCRIPT_SRC && (
        <>
          <Script src="https://code.jquery.com/jquery-3.6.3.min.js" />
          <Script src={ADOBE_ANALYTICS_SCRIPT_SRC} />
        </>
      )}

      <Head>
        {generateDefaultSeo({
          dangerouslySetAllPagesToNoIndex: true,
          dangerouslySetAllPagesToNoFollow: true,
          ...nextSEOConfig,
        })}
      </Head>
      <ClientEnvironmentProvider env={pageProps.clientEnvironment}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ClientEnvironmentProvider>
    </>
  );
};

// Fetch server-side container environments dynamically on every request
MyApp.getInitialProps = async (appContext: AppContext) => {
  // Execute underlying page data fetching (resolves translation loads, serverSideProps, etc)
  const appProps = await App.getInitialProps(appContext);

  const clientEnvironment = getClientEnvironment();

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      clientEnvironment,
    },
  };
};

export const getClientEnvironment = (): ClientEnvironment => {
  // getInitialProps is designed as a "universal" (isomorphic) data fetching method that runs on both the server and the client
  if (typeof window !== 'undefined') {
    return window.__CLIENT_ENV__ ?? { APP_BASE_URI: '', ENVIRONMENT: '' };
  }

  return {
    ADOBE_ANALYTICS_SCRIPT_SRC: process.env.ADOBE_ANALYTICS_SCRIPT_SRC,
    APP_BASE_URI: process.env.APP_BASE_URI ?? '',
    ENVIRONMENT: process.env.ENVIRONMENT ?? '',
    LOGGING_LEVEL: process.env.LOGGING_LEVEL,
    BUILD_DATE: process.env.BUILD_DATE,
  };
};

export default appWithTranslation(MyApp, nextI18NextConfig);
