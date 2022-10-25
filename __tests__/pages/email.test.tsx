import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Email from '../../pages/email'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout')
jest.mock('../../components/ErrorSummary')
jest.mock('../../components/InputField')
jest.mock('../../components/ActionButton')

jest.mock('next-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}))

jest.mock('../../lib/useEmailEsrf', () => {
  return jest.fn(() => ({
    isLoading: false,
    isSuccess: false,
    error: undefined,
    mutate: jest.fn(),
  }))
})

jest.mock('../../components/ErrorSummary', () => {
  return {
    GetErrorSummary: () => [],
  }
})

describe('Check status page', () => {
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
