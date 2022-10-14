import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import CancelModal from '../../components/CancelModal'

expect.extend(toHaveNoViolations)

describe('CancelModal', () => {
  const { container } = render(
    <CancelModal
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
