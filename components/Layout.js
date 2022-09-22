import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import MetaData from './MetaData'

import en from '../locales/en'
import fr from '../locales/fr'

export default function Layout(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <>
      <MetaData data={t.meta}></MetaData>

      <Header
        language={props.locale}
        t={t}
        langToggleLink={props.langToggleLink}
      ></Header>

      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-6 mt-5 p-8"
      >
        {props.children}
      </main>

      <Footer
        footerLogoAltText="symbol2"
        footerLogoImage="/wmms-blk.svg"
        footerNav1="aboutGovernment"
        footerNav2="aboutThisSite"
        t={t}
        links={[
          {
            link: t.footerContactUsURL,
            linkText: t.footerContactUs,
          },
          {
            link: t.footerTermsAndConditionURL,
            linkText: t.footerTermsAndCondition,
          },
          {
            link: t.footerPrivacyURL,
            linkText: t.footerPrivacy,
          },
        ]}
      />
    </>
  )
}

/**
 * Setup default props
 */

Layout.defaultProps = {
  title: 'Next Template - Canada.ca',
}

Layout.propTypes = {
  /*
   * Locale current language
   */
  locale: PropTypes.string,
  /*
   * Title of the page
   */
  title: PropTypes.string,
  /*
   * Link of the page in opposite language
   */
  langToggleLink: PropTypes.string,
}
