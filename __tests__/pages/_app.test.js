/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../pages/_app'
import Index from '../../pages/index'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('index page', () => {
  const component = Index
  const pageProps = {}
  const router = { locale: 'en' }

  it('should render the page', () => {
    render(<App Component={component} pageProps={pageProps} router={router} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
