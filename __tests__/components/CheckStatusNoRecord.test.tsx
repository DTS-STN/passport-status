import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import CheckStatusNoRecord from '../../components/CheckStatusResponses/CheckStatusNoRecord'

expect.extend(toHaveNoViolations)

describe('CheckStatusNoRecord', () => {
  const sut = <CheckStatusNoRecord />

  //TODO: add test for when phone number is visible and when it isn't
  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('no-record')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
