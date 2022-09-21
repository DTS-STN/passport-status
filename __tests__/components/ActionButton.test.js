import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ActionButton from '../../components/ActionButton'

expect.extend(toHaveNoViolations)

describe('ActionButton', () => {
  const { container } = render(<ActionButton text="text" />)

  it('renders', () => {
    const sut = screen.getByText('text')
    expect(sut).toBeInTheDocument()
  })

  it('sets primary style', () => {
    render(<ActionButton text="text" style="primary" />)
    const sut = screen.getByText('text')
    expect(sut).toHaveClass('bg-blue-900 text-gray-100 hover:bg-blue-800')
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
