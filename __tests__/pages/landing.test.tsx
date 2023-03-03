/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Landing from '../../src/pages/landing'

expect.extend(toHaveNoViolations)

jest.mock('../../src/components/ExampleImage')
jest.mock('../../src/components/Layout')
jest.mock('../../src/components/LinkButton')

describe('landing page', () => {
  it('should render the page', () => {
    render(<Landing />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Landing />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
