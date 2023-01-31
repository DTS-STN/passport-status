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
    <div className="flex min-h-screen flex-col">
      <Header
        skipToMainText={t('header.skip-to-main')}
        gocLink={t('header.goc-link')}
      />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto mt-5 flex-1 px-4 pb-8"
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
