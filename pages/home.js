import PropTypes from 'prop-types'
import fr from '../locales/home/fr'
import en from '../locales/home/en'
import InputTextFeild from '../components/InputTextFeild'
import ActionButton from '../components/ActionButton'
import { useState } from 'react'

export default function Home(props) {
  const [esrf, setEsrf] = useState('')
  const [esrfError, setEsrfError] = useState('')
  const [givenName, setGivenName] = useState('')
  const [givenNameError, setGivenNameError] = useState('')
  const [surname, setSurname] = useState('')
  const [surnameError, setSurnameError] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthDateError, setBirthDateError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    //clear errors
    setEsrfError('')
    setGivenNameError('')
    setSurnameError('')
    setBirthDateError('')

    //validate data
    if (!esrf) setEsrfError(props.content.esrf.error.required)
    else if (esrf.length != 8) setEsrfError(props.content.esrf.error.length)
    if (!givenName) setGivenNameError(props.content.givenName.error.required)
    if (!surname) setSurnameError(props.content.surname.error.required)
    if (!birthDate) setBirthDateError(props.content.birthDate.error.required)
    else {
      const dob = new Date(birthDate)
      if (isNaN(dob.getTime()))
        setBirthDateError(props.content.birthDate.error.invalid)
      else if (dob > new Date())
        setBirthDateError(props.content.birthDate.error.current)
    }
  }

  return (
    <>
      <h1>{props.content.header}</h1>
      <p>{props.content.description}</p>

      <form onSubmit={handleSubmit} id="form-get-status">
        <InputTextFeild
          id="ESRF"
          name="FileNumber"
          label={props.content.esrf.label}
          required
          textRequired={props.commonContent.required}
          value={esrf}
          onChange={setEsrf}
          errorMessage={esrfError}
        />
        <InputTextFeild
          id="givenName"
          name="givenName"
          label={props.content.givenName.label}
          required
          textRequired={props.commonContent.required}
          value={givenName}
          onChange={setGivenName}
          errorMessage={givenNameError}
        />
        <InputTextFeild
          id="surname"
          name="surname"
          label={props.content.surname.label}
          required
          textRequired={props.commonContent.required}
          value={surname}
          onChange={setSurname}
          errorMessage={surnameError}
        />
        <InputTextFeild
          id="dob"
          name="birthDate"
          label={props.content.birthDate.label}
          required
          textRequired={props.commonContent.required}
          value={birthDate}
          onChange={setBirthDate}
          errorMessage={birthDateError}
          type="date"
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
