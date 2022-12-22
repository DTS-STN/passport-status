import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import BorderedText from '../../components/BorderedText'

expect.extend(toHaveNoViolations)

describe('Borderedtext', () => {
  const sut = (
    <BorderedText>
      <p>content</p>
    </BorderedText>
  )

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('content')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
