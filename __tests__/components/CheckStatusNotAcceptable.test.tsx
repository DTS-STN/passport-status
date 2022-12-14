import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import CheckStatusNotAcceptable from '../../components/CheckStatusResponses/CheckStatusNotAcceptable'

expect.extend(toHaveNoViolations)

describe('CheckStatusNotAcceptable', () => {
  const sut = <CheckStatusNotAcceptable />

  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('not-acceptable')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
