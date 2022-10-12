import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import LinkSummary, { LinkSummaryItem } from '../../components/LinkSummary'
expect.extend(toHaveNoViolations)

const noMatchHref: LinkSummaryItem[] = [
  {
    href: 'www.google.com',
    text: 'Test Link',
  },
]

describe('LinkSummary', () => {
  const sut = <LinkSummary id={'testId'} links={noMatchHref} />

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Test Link')
    expect(screenText).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
