/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App, { getClientEnvironment, serializeClientEnvironment } from '../../src/pages/_app';

const adobeAnalyticsScriptSrc = 'https://assets.adobedtm.com/be5dfd287373/1e84b99f81fb/launch-ffa1e01dbeab-staging.min.js';
const jQueryScriptSrc = 'https://code.jquery.com/jquery-3.6.3.min.js';

jest.mock('../../src/lib/utils/fonts', () => ({
  lato: {
    style: {
      fontFamily: 'Lato',
    },
  },
  notoSans: {
    style: {
      fontFamily: '"Noto Sans"',
    },
  },
}));

const MockComponent = jest.fn().mockImplementation(() => <h1>Mock Component</h1>);

describe('custom `app`', () => {
  it('uses the window client environment in the browser', () => {
    const previousEnvironment = window.__CLIENT_ENV__;
    const clientEnvironment = {
      APP_BASE_URI: 'https://client.example',
      ENVIRONMENT: 'client',
    };
    window.__CLIENT_ENV__ = clientEnvironment;

    expect(getClientEnvironment()).toEqual(clientEnvironment);

    if (previousEnvironment) {
      window.__CLIENT_ENV__ = previousEnvironment;
    } else {
      delete window.__CLIENT_ENV__;
    }
  });

  it('escapes HTML-significant characters in serialized client environment', () => {
    expect(serializeClientEnvironment({ APP_BASE_URI: '', ENVIRONMENT: '</script><script>&' })).toBe(
      '{"APP_BASE_URI":"","ENVIRONMENT":"\\u003c/script\\u003e\\u003cscript\\u003e\\u0026"}',
    );
  });

  it('should render the page', () => {
    render(
      <App
        Component={MockComponent}
        pageProps={{
          clientEnvironment: {
            APP_BASE_URI: 'http://localhost',
            ENVIRONMENT: 'test',
          },
          _nextI18Next: {
            initialI18nStore: '',
            initialLocale: 'en',
            ns: ['common'],
            userConfig: null,
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router={{ events: { on: jest.fn(), off: jest.fn() } } as any}
      />,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    const aaScript = document.querySelector(`script[src="${adobeAnalyticsScriptSrc}"]`);
    const jQueryScript = document.querySelector(`script[src="${jQueryScriptSrc}"]`);
    expect(heading).toBeInTheDocument();
    expect(aaScript).not.toBeInTheDocument();
    expect(jQueryScript).not.toBeInTheDocument();
    expect(MockComponent).toHaveBeenCalled();
  });

  it('should render the page with adobe analytics', () => {
    render(
      <App
        Component={MockComponent}
        pageProps={{
          clientEnvironment: {
            ADOBE_ANALYTICS_SCRIPT_SRC: adobeAnalyticsScriptSrc,
            APP_BASE_URI: 'http://localhost',
            ENVIRONMENT: 'test',
          },
          _nextI18Next: {
            initialI18nStore: '',
            initialLocale: 'en',
            ns: ['common'],
            userConfig: null,
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router={{ events: { on: jest.fn(), off: jest.fn() } } as any}
      />,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    const aaScript = document.querySelector(`script[src="${adobeAnalyticsScriptSrc}"]`);
    const jQueryScript = document.querySelector(`script[src="${jQueryScriptSrc}"]`);
    expect(heading).toBeInTheDocument();
    expect(aaScript).toBeInTheDocument();
    expect(jQueryScript).toBeInTheDocument();
    expect(MockComponent).toHaveBeenCalled();
  });
});
