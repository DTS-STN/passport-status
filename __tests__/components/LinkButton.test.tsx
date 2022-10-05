import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import LinkButton from '../../components/LinkButton'
import Link from 'next/link'

expect.extend(toHaveNoViolations)

describe('LinkButton', () => {
  const { container } = render(<LinkButton text="text" />)

  it('renders', () => {
    const sut = screen.getByText('text')
    expect(sut).toBeInTheDocument()
  })

  it('passes the href to the button through passHref', () => {
    render(
      <Link href="www.canada.ca" passHref>
        <LinkButton text="text" href="www.canada.ca" />
      </Link>
    )
    const sut = screen.getByRole('link', { name: 'text' })
    expect(sut).toHaveAttribute('href', '/www.canada.ca')
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
