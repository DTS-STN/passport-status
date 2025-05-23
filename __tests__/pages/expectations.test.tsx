/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Expectations from '../../src/pages/expectations'

expect.extend(toHaveNoViolations)

jest.mock('../../src/components/Layout')
jest.mock('../../src/components/LinkButton')
jest.mock('../../src/lib/useAlerts', () => ({
  useAlerts: () => ({
    isPending: false,
    error: undefined,
    data: undefined,
  }),
}))

describe('expectations page', () => {
  it('should render the page', () => {
    render(<Expectations />)
    const button = screen.getByRole('button')
    const heading = screen.getByRole('heading', { level: 1 })

    expect(button).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'main-header')
  })

  it('should be accessible', async () => {
    const { container } = render(<Expectations />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
