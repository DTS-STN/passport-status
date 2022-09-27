/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../pages/_app'

describe('custom `app`', () => {
  const component = () => <h1>Mock Component</h1>
  const pageProps = {}
  const router = { locale: 'en' }

  it('should render the page', () => {
    render(<App Component={component} pageProps={pageProps} router={router} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
