import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'
import useCommonLocale from '../locales/useCommonLocale'
import { FC } from 'react'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const commonLocale = useCommonLocale()

  return (
    <div className="flex flex-col min-h-screen">
      <MetaData data={commonLocale.meta}></MetaData>

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
            link: commonLocale.footerContactUsURL,
            linkText: commonLocale.footerContactUs,
          },
          {
            link: commonLocale.footerTermsAndConditionURL,
            linkText: commonLocale.footerTermsAndCondition,
          },
          {
            link: commonLocale.footerPrivacyURL,
            linkText: commonLocale.footerPrivacy,
          },
        ]}
      />
    </div>
  )
}

export default Layout
