import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusProcessingOverdue from '../../../src/components/check-status-responses/CheckStatusProcessingOverdue'
import { TimelineEntryData } from '../../../src/lib/types'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusFileProcessingOverdue', () => {
  const handleOnGoBackClick = () => {}
  const timelineData: TimelineEntryData[] = [
    {
      step: 'Received',
      status: 'done',
      date: '2025-01-01',
    },
  ]
  const sut = (
    <CheckStatusProcessingOverdue
      backButtonHandler={handleOnGoBackClick}
      timelineData={timelineData}
      receivedDate="2025-01-01"
      serviceLevel="20"
      deliveryMethod="mail"
    />
  )

  it('renders', () => {
    render(sut)
    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('processing-overdue')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
