import { FC } from 'react'
import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'

export interface LayoutProps {
  children: React.ReactNode
  meta: any
  header: any
  footer: any
}

const Layout: FC<LayoutProps> = ({ children, meta, header, footer }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaData author={meta.author} desc={meta.desc} title={meta.title} />
      <Header skipToMainText={header.skipToMain} gocLink={header.gocLink} />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-4 pb-8 mt-5 flex-1"
      >
        {children}
      </main>

      <Footer
        dateModifiedText={footer.dateModifiedText}
        footerLogoAltText="symbol2"
        footerLogoImage="/wmms-blk.svg"
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
        links={[
          {
            link: footer.links.contactUsURL,
            linkText: footer.links.contactUs,
          },
          {
            link: footer.links.termsAndConditionURL,
            linkText: footer.links.termsAndCondition,
          },
          {
            link: footer.links.privacyURL,
            linkText: footer.links.privacy,
          },
        ]}
      />
    </div>
  )
}

export default Layout
