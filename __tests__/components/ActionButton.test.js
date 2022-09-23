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
    expect(sut).toHaveClass(
      'inline-block text-center align-middle rounded border py-2.5 px-3.5 focus:ring-2 focus:ring-offset-2border-blue-deep bg-blue-dark text-basic-white hover:bg-blue-normal'
    )
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
