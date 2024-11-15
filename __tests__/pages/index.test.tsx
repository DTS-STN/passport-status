/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Index from '../../src/pages/index'

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
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })
})
