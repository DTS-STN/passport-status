import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import InputFeild from '../../components/InputFeild'

expect.extend(toHaveNoViolations)

jest.mock('../../components/InputLabel', () => () => {
  return <mock-modal data-testid="label-modal" />
})
jest.mock('../../components/InputErrorMessage', () => () => {
  return <mock-modal data-testid="error-modal" />
})

describe('InputFeild', () => {
  const { container } = render(<InputFeild id="id" name="name" label="label" />)

  it('renders', () => {
    const sut = screen.getByTestId('id')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
