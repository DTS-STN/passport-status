/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Consent from '../../pages/consent'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

jest.mock('../../components/Layout')
jest.mock('../../components/LinkButton')

describe('Consent page', () => {
  it('should render the page', () => {
    render(<Consent />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Consent />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
