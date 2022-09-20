import PropTypes from 'prop-types'
import en from '../locales/en'
import fr from '../locales/fr'
import logger from '../lib/logger'
import { useEffect } from 'react'

import { fetchContent } from '../lib/cms'

export default function Home(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  logger.info('Home page')
  logger.error('test')
  logger.warn('test')
  useEffect(() => {
    logger.debug('Home mounted')
  }, [])

  return (
    <div
      id="homeContent"
      className="container mx-auto px-6 mt-5 bg-slate-300 p-8"
    >
      <h1>{props.content.header}</h1>
      <p>{props.content.paragraph}</p>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const content = await fetchContent()

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/home' : '/home'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Next Template - Home',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Next Template - Accueil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, content, meta },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
