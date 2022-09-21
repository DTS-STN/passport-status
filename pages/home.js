import PropTypes from 'prop-types'
import fr from '../locales/home/fr'
import en from '../locales/home/en'
import InputTextFeild from '../components/InputTextFeild'
import ActionButton from '../components/ActionButton'
import { useState } from 'react'

export default function Home(props) {
  const [esrf, setEsrf] = useState('')
  const [esrfError, setEsrfError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    //clear errors
    setEsrfError('')

    //validate data
    if (!esrf) setEsrfError(props.content.esrf.error.required)
    else if (esrf.length != 8) setEsrfError(props.content.esrf.error.length)
  }

  return (
    <>
      <h1>{props.content.header}</h1>
      <p>{props.content.description}</p>

      <form onSubmit={handleSubmit}>
        <InputTextFeild
          id="ESRF"
          name="FileNumber"
          label={props.content.esrf.label}
          required
          textRequired={props.commonContent.required}
          value={esrf}
          onChange={setEsrf}
          error={esrfError ? true : false}
          errorMessage={esrfError}
        />
        <ActionButton
          type="submit"
          text={props.content.checkStatus}
          style="primary"
        />
      </form>
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
