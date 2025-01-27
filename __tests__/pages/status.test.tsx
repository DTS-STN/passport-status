import { PropsWithChildren } from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { axe, toHaveNoViolations } from 'jest-axe'

import Status from '../../src/pages/status'

expect.extend(toHaveNoViolations)

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))
jest.mock('../../src/components/ActionButton')
jest.mock('../../src/components/ExampleImage')
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
    isPending: false,
    error: undefined,
    data: undefined,
    remove: jest.fn(),
  }),
}))
jest.mock('../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient()
  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Wrapper
}

describe('Check status page', () => {
  it('should render the page', () => {
    render(<Status />, { wrapper: createWrapper() })
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('should be accessible', async () => {
    const { container } = render(<Status />, { wrapper: createWrapper() })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
