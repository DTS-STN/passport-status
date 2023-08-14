import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusNotAcceptable from '../../../src/components/check-status-responses/CheckStatusNotAcceptable'

expect.extend(toHaveNoViolations)

jest.mock('../../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isLoading: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('CheckStatusNotAcceptable', () => {
  const sut = <CheckStatusNotAcceptable />

  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('not-acceptable')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
