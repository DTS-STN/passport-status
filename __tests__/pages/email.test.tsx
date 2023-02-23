import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Email from '../../pages/email'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))
jest.mock('../../components/ActionButton')
jest.mock('../../components/ErrorSummary', () => ({
  default: jest.fn(),
  getErrorSummaryItems: jest.fn(() => []),
}))
jest.mock('../../components/IdleTimeout')
jest.mock('../../components/InputField')
jest.mock('../../components/Layout')
jest.mock('../../components/Modal')
jest.mock('../../lib/useEmailEsrf', () => {
  return jest.fn(() => ({
    isLoading: false,
    isSuccess: false,
    error: undefined,
    mutate: jest.fn(),
  }))
})

describe('Check email page', () => {
  it('should render the page', () => {
    render(<Email />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Email />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
