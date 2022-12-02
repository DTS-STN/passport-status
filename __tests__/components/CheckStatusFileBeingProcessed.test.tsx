import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import CheckStatusFileBeingProcessed from '../../components/CheckStatusResponses/CheckStatusFileBeingProcessed'

expect.extend(toHaveNoViolations)

describe('CheckStatusFileBeingProcessed', () => {
  const sut = <CheckStatusFileBeingProcessed />

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('being-processed')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
