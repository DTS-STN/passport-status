import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusNotAcceptable from '../../../src/components/check-status-responses/CheckStatusNotAcceptable'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusNotAcceptable', () => {
  const sut = <CheckStatusNotAcceptable />

  it('renders', () => {
    render(sut)
    const heading = screen.getByRole('heading', { level: 1 })

    expect(screen.getByTestId('not-acceptable')).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
