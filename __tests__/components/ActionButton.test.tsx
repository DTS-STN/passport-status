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
    render(<ActionButton text="my-button-text" style="primary" />)
    const sut = screen.getByText('my-button-text')
    expect(sut).toHaveClass(
      'inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active'
    )
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
