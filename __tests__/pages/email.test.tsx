import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Email from '../../pages/email'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout', () => 'Layout')

describe('Check status page', () => {
  it('should render the page', () => {
    render(<Email />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Email />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
