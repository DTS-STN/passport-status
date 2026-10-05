import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { ClientEnvironment } from '../context/ClientEnvironmentContext';
import { serializeClientEnvironment } from '../lib/utils/client-environment';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html lang={(this.props.locale?.toLowerCase() ?? 'default') === 'default' ? 'en' : this.props.locale}>
        <Head />
        <body>
          <Script
            id="client-environment"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__CLIENT_ENV__ = ${serializeClientEnvironment(
                this.props.__NEXT_DATA__.props.pageProps.clientEnvironment as ClientEnvironment | undefined,
              )};`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
