import PropTypes, { string } from 'prop-types'
import fr from '../locales/home/fr'
import en from '../locales/home/en'
import InputFeild from '../components/InputFeild'
import ActionButton from '../components/ActionButton'
import { useState } from 'react'
import ErrorSummary from '../components/ErrorSummary'

export default function Home(props) {
  const [esrf, setEsrf] = useState()
  const [esrfError, setEsrfError] = useState()
  const [givenName, setGivenName] = useState()
  const [givenNameError, setGivenNameError] = useState()
  const [surname, setSurname] = useState()
  const [surnameError, setSurnameError] = useState()
  const [birthDate, setBirthDate] = useState()
  const [birthDateError, setBirthDateError] = useState()
  const [response, setResponse] = useState()
  const [errorSummary, setErrorSummary] = useState()

  function setError(id, msg) {
    return {
      feildId: id,
      errorMessage: msg,
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    //clear form data, errors & results
    setErrorSummary()
    setEsrfError()
    setGivenNameError()
    setSurnameError()
    setBirthDateError()
    setEsrf()
    setGivenName()
    setSurname()
    setBirthDate()
    setResponse()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //clear errors & results
    setErrorSummary()
    setEsrfError()
    setGivenNameError()
    setSurnameError()
    setBirthDateError()
    setResponse()
    let errors = []

    //validate data
    if (!esrf) errors.push(setError('esrf', props.content.esrf.error.required))
    else if (esrf.length != 8)
      errors.push(setError('esrf', props.content.esrf.error.length))

    if (!givenName)
      errors.push(setError('givenName', props.content.givenName.error.required))

    if (!surname)
      errors.push(setError('surname', props.content.surname.error.required))

    if (!birthDate)
      errors.push(setError('dob', props.content.birthDate.error.required))
    else {
      const dob = new Date(birthDate)
      if (isNaN(dob.getTime()))
        errors.push(setError('dob', props.content.birthDate.error.invalid))
      else if (dob > new Date())
        errors.push(setError('dob', props.content.birthDate.error.current))
    }

    //check if form is valid
    if (errors.length > 0) {
      //set the errors
      errors.forEach((error) => {
        switch (error.feildId) {
          case 'esrf':
            setEsrfError(error.errorMessage)
            break
          case 'givenName':
            setGivenNameError(error.errorMessage)
            break
          case 'surname':
            setSurnameError(error.errorMessage)
            break
          case 'dob':
            setBirthDateError(error.errorMessage)
            break
        }
      })
      setErrorSummary(errors)
    } else {
      //make the request for status
      const response = await fetch('/api/checkStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ esrf, givenName, surname, birthDate }),
      })
      const result = await response.json()
      result.success = response.ok
      setResponse(result)
    }
  }

  return (
    <>
      <h1 className="mb-4">{props.content.header}</h1>
      {!response ? (
        <div>
          <p>{props.content.description}</p>
          {!errorSummary ? null : (
            <ErrorSummary
              id="error-summary-get-status"
              summary={props.commonContent.foundErrors}
              errors={errorSummary}
            />
          )}
          <form onSubmit={handleSubmit} id="form-get-status">
            <InputFeild
              id="esrf"
              name="FileNumber"
              label={props.content.esrf.label}
              required
              textRequired={props.commonContent.required}
              value={esrf}
              onChange={setEsrf}
              errorMessage={esrfError}
            />
            <InputFeild
              id="givenName"
              name="givenName"
              label={props.content.givenName.label}
              required
              textRequired={props.commonContent.required}
              value={givenName}
              onChange={setGivenName}
              errorMessage={givenNameError}
            />
            <InputFeild
              id="surname"
              name="surname"
              label={props.content.surname.label}
              required
              textRequired={props.commonContent.required}
              value={surname}
              onChange={setSurname}
              errorMessage={surnameError}
            />
            <InputFeild
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
        </div>
      ) : (
        <div id="response">
          {response.success ? (
            <p className="mb-6 text-2xl">
              {props.content.statusIs}{' '}
              <strong>{props.content.status[response.status]}</strong>.
            </p>
          ) : (
            <p className=" mb-6 text-2xl">{props.content.unableToFindStatus}</p>
          )}
          <p className="mb-6 text-2xl">{props.content.checkAgain}</p>
          <ActionButton
            onClick={handleReset}
            text={props.content.resetForm}
            style="primary"
          />
        </div>
      )}
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
