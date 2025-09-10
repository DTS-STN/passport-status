/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from '../../src/pages/_app'

const adobeAnalyticsScriptSrc =
  'https://assets.adobedtm.com/be5dfd287373/1e84b99f81fb/launch-ffa1e01dbeab-staging.min.js'
const jQueryScriptSrc = 'https://code.jquery.com/jquery-3.6.3.min.js'

const mockGetConfig = jest.fn().mockImplementation(() => ({
  publicRuntimeConfig: {
    adobeAnalyticsScriptSrc: undefined,
  },
}))

jest.mock('next/config', () => () => mockGetConfig())

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
}))

const MockComponent = jest
  .fn()
  .mockImplementation(() => <h1>Mock Component</h1>)

describe('custom `app`', () => {
  it('should render the page', () => {
    render(
      <App
        Component={MockComponent}
        pageProps={{
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
    )

    const heading = screen.getByRole('heading', { level: 1 })
    const aaScript = document.querySelector(
      `script[src="${adobeAnalyticsScriptSrc}"]`,
    )
    const jQueryScript = document.querySelector(
      `script[src="${jQueryScriptSrc}"]`,
    )
    expect(heading).toBeInTheDocument()
    expect(aaScript).not.toBeInTheDocument()
    expect(jQueryScript).not.toBeInTheDocument()
    expect(MockComponent).toHaveBeenCalled()
    expect(mockGetConfig).toHaveBeenCalled()
  })

  it('should render the page with adobe analytics', () => {
    mockGetConfig.mockReturnValueOnce({
      publicRuntimeConfig: {
        adobeAnalyticsScriptSrc,
      },
    })
    render(
      <App
        Component={MockComponent}
        pageProps={{
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
    )

    const heading = screen.getByRole('heading', { level: 1 })
    const aaScript = document.querySelector(
      `script[src="${adobeAnalyticsScriptSrc}"]`,
    )
    const jQueryScript = document.querySelector(
      `script[src="${jQueryScriptSrc}"]`,
    )
    expect(heading).toBeInTheDocument()
    expect(aaScript).toBeInTheDocument()
    expect(jQueryScript).toBeInTheDocument()
    expect(MockComponent).toHaveBeenCalled()
    expect(mockGetConfig).toHaveBeenCalled()
  })
})
