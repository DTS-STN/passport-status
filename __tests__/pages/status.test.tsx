import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Status from '../../pages/status'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout')
jest.mock('../../components/StatusInfo')
jest.mock('../../components/ErrorSummary')
jest.mock('../../components/InputField')
jest.mock('../../components/ActionButton')

jest.mock('../../lib/CheckStatusHook', () => ({
  useCheckStatus: () => ({
    isLoading: false,
    error: undefined,
    data: undefined,
    remove: jest.fn(),
  }),
}))

jest.mock('next-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (str: string) => str,
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
