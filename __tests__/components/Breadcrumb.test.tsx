import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Breadcrumb from '../../components/Breadcrumb'

expect.extend(toHaveNoViolations)

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

describe('Breadcrumb', () => {
  it('renders Breadcrumb with links', () => {
    render(
      <Breadcrumb
        items={[
          {
            link: 'https://canada.ca',
            text: 'Canada.ca',
          },
          {
            link: 'https://exmample.com',
            text: 'Example Item',
          },
        ]}
      />
    )

    const canadaLink = screen.getByText('Canada.ca', { exact: true })
    expect(canadaLink).toBeInTheDocument()
    const exampleLink = screen.getByText('Example Item', { exact: true })
    expect(exampleLink).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Breadcrumb
        items={[
          {
            link: 'https://canada.ca',
            text: 'Canada.ca',
          },
          {
            link: 'https://exmemple.com',
            text: 'Example Item',
          },
        ]}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
