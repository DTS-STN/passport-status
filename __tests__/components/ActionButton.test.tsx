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
      'border-blue-deep bg-blue-dark text-basic-white hover:bg-blue-normal'
    )
  })

  it('renders properly as an anchor tag using Next/Link', () => {
    render(
      <ActionButton
        text="text"
        style="primary"
        href="https://www.someurl.com"
      />
    )
    const sut = screen.getByText('text')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
