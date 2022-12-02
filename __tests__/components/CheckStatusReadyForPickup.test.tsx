import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import CheckStatusReadyForPickup from '../../components/CheckStatusResponses/CheckStatusReadyForPickup'

expect.extend(toHaveNoViolations)

describe('CheckStatusReadyForPickup', () => {
  const sut = <CheckStatusReadyForPickup />

  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('ready-for-pickup')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
