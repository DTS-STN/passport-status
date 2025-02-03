import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusFileBeingProcessed from '../../../src/components/check-status-responses/CheckStatusFileBeingProcessed'
import {
  DeliveryMethodCode,
  ServiceLevelCode,
  StatusDisplayData,
  TimelineEntryData,
} from '../../../src/lib/types'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusFileBeingProcessed', () => {
  const handleOnGoBackClick = () => {}
  const timelineData: TimelineEntryData[] = [
    {
      step: 'Received',
      status: 'done',
      date: '2025-01-01',
    },
  ]

  const displayData: StatusDisplayData = {
    serviceLevel: ServiceLevelCode.TWENTY_DAYS,
    timelineExists: true,
    timelineData: timelineData,
    deliveryMethod: DeliveryMethodCode.MAIL,
    receivedDate: '2025-01-01',
  }

  const sut = (
    <CheckStatusFileBeingProcessed
      backButtonHandler={handleOnGoBackClick}
      displayData={displayData}
    />
  )

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut)
    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('being-processed')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
