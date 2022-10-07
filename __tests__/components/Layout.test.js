import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Layout from '../../components/Layout'

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

//mock custom components
jest.mock('../../components/MetaData')
jest.mock('../../components/Header')
jest.mock('../../components/Footer')

expect.extend(toHaveNoViolations)

describe('Layout with default text', () => {
  const sut = <Layout meta={{}} header={{}} footer={{ links: {} }} />

  it('Layout contains a Main tag', () => {
    render(sut)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('Layout contains no a11y violations', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
