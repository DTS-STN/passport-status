import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusNoRecord from '../../../src/components/check-status-responses/CheckStatusNoRecord'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusNoRecord', () => {
  const sut = <CheckStatusNoRecord />

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('no-record')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
