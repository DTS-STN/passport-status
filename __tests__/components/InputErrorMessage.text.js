import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InputErrorMessage } from '../../components/InputErrorMessage'

expect.extend(toHaveNoViolations)

describe('InputErrorMessage', () => {
  const { container } = render(<InputErrorMessage message="message" />)

  it('renders', () => {
    const sut = screen.getByText('message')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
