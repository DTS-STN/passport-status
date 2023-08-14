import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusReadyForPickup from '../../../src/components/check-status-responses/CheckStatusReadyForPickup'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isLoading: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusReadyForPickup', () => {
  const sut = <CheckStatusReadyForPickup />

  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('ready-for-pickup')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
