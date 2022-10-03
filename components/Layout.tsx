import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'
import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col min-h-screen">
      <MetaData
        data={{
          author: t('meta.author'),
          desc: t('meta.desc'),
          keywords: t('meta.keywords'),
          title: t('meta.title'),
        }}
      />

      <Header />

      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-6 mt-5 p-8 flex-1"
      >
        {children}
      </main>

      <Footer
        footerLogoAltText="symbol2"
        footerLogoImage="/wmms-blk.svg"
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
        links={[
          {
            link: t('footer.contact-us-url'),
            linkText: t('footer.contact-us'),
          },
          {
            link: t('footer.terms-and-condition-url'),
            linkText: t('footer.terms-and-condition'),
          },
          {
            link: t('footer.privacy-url'),
            linkText: t('footer.privacy'),
          },
        ]}
      />
    </div>
  )
}

export default Layout
