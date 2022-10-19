import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Email from '../../pages/email'
import { EmailEsrf } from '../../lib/EmailEsrfHook'
import { GetErrorSummary } from '../../components/ErrorSummary'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout', () => 'Layout')
jest.mock('../../lib/EmailEsrfHook')
jest.mock('../../components/ErrorSummary')
jest.mock('../../components/InputField')
jest.mock('../../components/ActionButton')

describe('Check status page', () => {
  beforeEach(() => {
    EmailEsrf.mockImplementation(() => ({}))
    GetErrorSummary.mockImplementation(() => [])
  })

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
