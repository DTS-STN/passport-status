import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Header from '../../components/Header'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// the code below is to avoid the following error:
//    "An update to Link inside a test was not wrapped in act(...)"
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => (
    <children.type {...children.props} href={href} />
  ),
}))

const defaultRouterObj = {
  pathname: '/',
  asPath: '/',
  locale: 'en',
}

expect.extend(toHaveNoViolations)

describe('Header', () => {
  useRouter.mockImplementation(() => defaultRouterObj)

  it('renders Header in English', () => {
    render(<Header />)
    const HeaderLang = screen.getByText('Français')
    expect(HeaderLang).toBeInTheDocument()
  })

  it('renders Header in French', () => {
    useRouter.mockImplementation(() => ({ ...defaultRouterObj, locale: 'fr' }))
    render(<Header />)
    const HeaderLang = screen.getByText('English')
    expect(HeaderLang).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
