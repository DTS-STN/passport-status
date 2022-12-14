/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../pages/_app'
import { Router } from 'next/router'

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
        router={{} as Router}
      />
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
