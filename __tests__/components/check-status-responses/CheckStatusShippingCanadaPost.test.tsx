import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusShippingFedex from '../../../src/components/check-status-responses/CheckStatusShippingFedex'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusShippingFedex', () => {
  const sut = <CheckStatusShippingFedex />

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('shipped-fedex')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
