import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Status from '../../src/pages/status'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))
jest.mock('../../src/components/ActionButton')
jest.mock('../../src/components/ExampleImage')
jest.mock('../../src/components/CheckStatusInfo')
jest.mock('../../src/components/ErrorSummary', () => ({
  default: jest.fn(),
  getErrorSummaryItems: jest.fn(() => []),
}))
jest.mock('../../src/components/IdleTimeout')
jest.mock('../../src/components/InputField')
jest.mock('../../src/components/Layout')
jest.mock('../../src/components/Modal')
jest.mock('../../src/lib/useCheckStatus', () => ({
  useCheckStatus: () => ({
    isLoading: false,
    error: undefined,
    data: undefined,
    remove: jest.fn(),
  }),
}))

describe('Check status page', () => {
  it('should render the page', () => {
    render(<Status />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Status />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
