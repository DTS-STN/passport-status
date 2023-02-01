/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Expectations from '../../pages/expectations'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout')
jest.mock('../../components/LinkButton')

describe('expectations page', () => {
  it('should render the page', () => {
    render(<Expectations />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Expectations />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
