/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Index from '../../pages/index'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    asPath: '/',
  }),
}))

describe('index page', () => {
  it('should render the page', () => {
    render(<Index />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })
})
