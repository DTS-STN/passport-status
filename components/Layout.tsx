import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'
import useCommonLocale from '../locales/useCommonLocale'
import { FC } from 'react'
import { useRouter } from 'next/router'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { locale, asPath } = useRouter()
  const commonLocale = useCommonLocale()

  const langToggleLink = (locale === 'en' ? '/fr' : '') + asPath

  return (
    <>
      <MetaData data={commonLocale.meta}></MetaData>

      <Header
        language={locale}
        t={commonLocale}
        langToggleLink={langToggleLink}
      ></Header>

      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-6 mt-5 p-8"
      >
        {children}
      </main>

      <Footer
        footerLogoAltText="symbol2"
        footerLogoImage="/wmms-blk.svg"
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
        t={commonLocale}
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
    </>
  )
}

export default Layout
