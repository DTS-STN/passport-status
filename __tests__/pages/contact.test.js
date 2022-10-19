/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Contact from '../../pages/contact'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout', () => 'Layout')
jest.mock('../../components/LinkButton')

describe('Contact page', () => {
  it('should render the page', () => {
    render(<Contact />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Contact />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
