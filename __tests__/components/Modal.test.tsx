import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import Modal from '../../components/Modal'

expect.extend(toHaveNoViolations)

describe('Modal', () => {
  const { container } = render(
    <Modal
      buttonText="Some text"
      description="Some description"
      isOpen={false}
      onClick={() => jest.fn()}
      buttons={[{ text: 'some text' }]}
    />
  )
  it('renders', () => {
    const sut = screen.getByText('Some text')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
