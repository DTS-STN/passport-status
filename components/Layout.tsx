import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'

export interface LayoutProps {
  children: React.ReactNode
  meta: any
  header: any
  footer: any
}

export default function Layout({
  children,
  meta,
  header,
  footer,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaData
        data={{
          author: meta.author,
          desc: meta.desc,
          keywords: meta.keywords,
          title: meta.title,
        }}
      />

      <Header skipToMainText={header.skipToMain} gocLink={header.gocLink} />

      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-6 mt-5 p-8 flex-1"
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
