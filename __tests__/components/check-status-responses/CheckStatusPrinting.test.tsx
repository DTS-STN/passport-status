import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusPrinting from '../../../src/components/check-status-responses/CheckStatusPrinting'
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

describe('CheckStatusPrinting', () => {
  const checkAnotherHandler = () => null
  const timelineData: TimelineEntryData[] = [
    {
      step: 'Received',
      date: '2024-01-01',
      status: 'done',
    },
    {
      step: 'Reviewd',
      date: '2024-01-02',
      status: 'done',
    },
    {
      step: 'Print in progress',
      date: '2024-01-03',
      status: 'current',
    },
    {
      step: 'Mailed out',
      status: 'future',
    },
  ]

  const displayData: StatusDisplayData = {
    serviceLevel: ServiceLevelCode.TWENTY_DAYS,
    timelineExists: true,
    timelineData: timelineData,
    deliveryMethod: DeliveryMethodCode.MAIL,
    receivedDate: '2024-01-01',
  }

  const sut = (
    <CheckStatusPrinting
      checkAnotherHandler={checkAnotherHandler}
      displayData={displayData}
    />
  )

  it('renders', () => {
    render(sut)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('printing')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
