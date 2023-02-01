/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Landing from '../../pages/landing'

expect.extend(toHaveNoViolations)

jest.mock('../../components/ExampleImage')
jest.mock('../../components/Layout')
jest.mock('../../components/LinkButton')

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
