import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Email from '../../pages/email'

expect.extend(toHaveNoViolations)

jest.mock('../../components/ActionButton')
jest.mock('../../components/ErrorSummary', () => ({
  default: jest.fn(),
  getErrorSummaryItems: jest.fn(() => []),
}))
jest.mock('../../components/InputField')
jest.mock('../../components/Layout')
jest.mock('../../lib/useEmailEsrf', () => {
  return jest.fn(() => ({
    isLoading: false,
    isSuccess: false,
    error: undefined,
    mutate: jest.fn(),
  }))
})

//Mocks for dialog element until PR containing fix for TypeError is merged into jsdom
HTMLDialogElement.prototype.show = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true
})

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true
})

HTMLDialogElement.prototype.close = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = false
})

describe('Check status page', () => {
  it('should render the page', () => {
    render(<Email />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should be accessable', async () => {
    const { container } = render(<Email />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
