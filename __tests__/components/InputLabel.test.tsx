import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InputLabel from '../../components/InputLabel'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('InputLabel', () => {
  const { container } = render(
    <InputLabel id="id" label="label" htmlFor="input" />
  )

  it('renders', () => {
    const sut = screen.getByText('label')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
