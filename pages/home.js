import PropTypes from 'prop-types'
import fr from '../locales/home/fr'
import en from '../locales/home/en'
import InputTextFeild from '../components/InputTextFeild'

export default function Home(props) {
  return (
    <>
      <h1>{props.content.header}</h1>
      <p>{props.content.description}</p>

      <InputTextFeild
        id="SERF"
        name="FileNumber"
        label={props.content.serfLabel}
        required
        textRequired={props.commonContent.required}
      />
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
