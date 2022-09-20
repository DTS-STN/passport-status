import PropTypes from 'prop-types'
import fr from '../locales/home/fr'
import en from '../locales/home/en'

export default function Home(props) {
  return (
    <>
      <h1>{props.content.header}</h1>
      <p>{props.content.description}</p>
    </>
  )
}

export async function getStaticProps({ locale }) {
  const content = locale === 'en' ? en : fr

  return {
    props: { locale, content },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,
}
