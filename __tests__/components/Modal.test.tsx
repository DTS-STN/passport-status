import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import Modal from '../../components/Modal'

expect.extend(toHaveNoViolations)

describe('Modal', () => {
  const { container } = render(
    <Modal
      open
      actionButtons={[{ text: 'button text' }]}
      header={'header'}
      description={'description'}
    />
  )

  it('renders', () => {
    const sut = screen.getByRole('dialog')
    const header = screen.getByText('header')
    const description = screen.getByText('description')
    const actionButton = screen.getByText('button text')
    expect(sut).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(actionButton).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
