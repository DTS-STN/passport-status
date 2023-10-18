import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Email from '../../src/pages/email'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))
jest.mock('../../src/components/ActionButton')
jest.mock('../../src/components/ErrorSummary', () => ({
  default: jest.fn(),
  getErrorSummaryItems: jest.fn(() => []),
}))
jest.mock('../../src/components/IdleTimeout')
jest.mock('../../src/components/InputField')
jest.mock('../../src/components/Layout')
jest.mock('../../src/components/Modal')
jest.mock('../../src/lib/useEmailEsrf', () => {
  return jest.fn(() => ({
    isPending: false,
    isSuccess: false,
    error: undefined,
    mutate: jest.fn(),
  }))
})

jest.mock('../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

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
