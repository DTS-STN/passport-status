import { FC, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useTranslation } from 'next-i18next'

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation('common')
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        breadcrumbProps={{
          items: [
            {
              link: t('breadcrumb.canada-ca.link'),
              text: t('breadcrumb.canada-ca.text'),
            },
            {
              link: t('breadcrumb.travel-and-tourism.link'),
              text: t('breadcrumb.travel-and-tourism.text'),
            },
            {
              link: t(
                'breadcrumb.canadian-passports-and-other-travel-documents.link'
              ),
              text: t(
                'breadcrumb.canadian-passports-and-other-travel-documents.text'
              ),
            },
          ],
        }}
        skipToMainText={t('header.skip-to-main')}
        gocLink={t('header.goc-link')}
      />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-4 pb-8 flex-1"
      >
        {children}
      </main>

      <Footer
        dateModifiedText={t('footer.date-modified-text')}
        footerLogoAltText="symbol2"
        footerLogoImage="/wmms-blk.svg"
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
        links={[
          {
            link: t('footer.links.contact-us-url'),
            linkText: t('footer.links.contact-us'),
          },
          {
            link: t('footer.links.terms-and-condition-url'),
            linkText: t('footer.links.terms-and-condition'),
          },
          {
            link: t('footer.links.privacy-url'),
            linkText: t('footer.links.privacy'),
          },
        ]}
      />
    </div>
  )
}

export default Layout
