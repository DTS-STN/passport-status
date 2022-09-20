import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../components/Footer'
import en from '../../locales/en'

expect.extend(toHaveNoViolations)

describe('Footer', () => {
  it('renders Footer with links', () => {
    render(
      <Footer
        footerLogoAltText="testAltText"
        footerLogoImage="testImage"
        t={en}
        footerBoxLinks={[
          {
            footerBoxlink: 'footerContactUsURL',
            footerBoxLinkText: 'footerContactUs',
          },
          {
            footerBoxlink: 'footerNewsURL',
            footerBoxLinkText: 'footerNews',
          },
        ]}
        links={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
          {
            link: 'https://some-link-2.com',
            linkText: 'some-lin-2',
          },
          {
            link: 'https://some-link-3.com',
            linkText: 'some-link-3',
          },
          {
            link: 'https://some-link-4.com',
            linkText: 'some-link-4',
          },
        ]}
      />
    )
    const footerLink = screen.getByText('some-link-4')
    expect(footerLink).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Footer
        footerLogoAltText="testAltText"
        footerLogoImage="testImage"
        t={en}
        footerBoxLinks={[
          {
            footerBoxlink: 'footerContactUsURL',
            footerBoxLinkText: 'footerContactUs',
          },
        ]}
        links={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
