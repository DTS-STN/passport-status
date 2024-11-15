import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusReadyForPickup from '../../../src/components/check-status-responses/CheckStatusReadyForPickup'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusReadyForPickup', () => {
  const sut = <CheckStatusReadyForPickup />

  it('renders', () => {
    render(sut)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('ready-for-pickup')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
