import commonEn from '../locales/en'
import commonFr from '../locales/fr'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItem,
} from '../components/ErrorSummary'
import useHomeLocale from '../locales/home/useHomeLocale'
import useCommonLocale from '../locales/useCommonLocale'
import Layout from '../components/Layout'
import { object } from 'prop-types'

export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}

export interface PassportStatusesSearchResponse {
  _embedded: {
    passportStatuses: PassportStatus[]
  }
  page: Page
}

export interface PassportStatus {
  id?: string
  fileNumber?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  status?: string
}

export type CommonContent = typeof commonEn | typeof commonFr

const Home: FC = () => {
  const commonLocale = useCommonLocale()
  const homeLocale = useHomeLocale()

  const [esrf, setEsrf] = useState<string | undefined>()
  const [esrfError, setEsrfError] = useState<string | undefined>()
  const [givenName, setGivenName] = useState<string | undefined>()
  const [givenNameError, setGivenNameError] = useState<string | undefined>()
  const [surname, setSurname] = useState<string | undefined>()
  const [surnameError, setSurnameError] = useState<string | undefined>()
  const [birthDate, setBirthDate] = useState<string | undefined>()
  const [birthDateError, setBirthDateError] = useState<string | undefined>()
  const [response, setResponse] = useState<
    PassportStatus | 'not-found' | 'non-unique' | undefined
  >()
  const [errorSummary, setErrorSummary] = useState<ErrorSummaryItem[]>([])

  console.log(typeof response)

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    //clear form data, errors & results
    setErrorSummary([])
    setEsrfError(undefined)
    setGivenNameError(undefined)
    setSurnameError(undefined)
    setBirthDateError(undefined)
    //response will only be an object with a successful fetch from the API, else form data will not be cleared so user can check for typos
    if (typeof response === 'object') {
      setEsrf(undefined)
      setGivenName(undefined)
      setSurname(undefined)
      setBirthDate(undefined)
    }
    setResponse(undefined)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    //clear errors & results
    setErrorSummary([])
    setEsrfError(undefined)
    setGivenNameError(undefined)
    setSurnameError(undefined)
    setBirthDateError(undefined)
    setResponse(undefined)

    const errors: ErrorSummaryItem[] = []

    //validate data
    if (!esrf)
      errors.push(getErrorSummaryItem('esrf', homeLocale.esrf.error.required))
    else if (esrf.length != 8)
      errors.push(getErrorSummaryItem('esrf', homeLocale.esrf.error.length))

    if (!givenName)
      errors.push(
        getErrorSummaryItem('givenName', homeLocale.givenName.error.required)
      )

    if (!surname)
      errors.push(
        getErrorSummaryItem('surname', homeLocale.surname.error.required)
      )

    if (!birthDate)
      errors.push(
        getErrorSummaryItem('dob', homeLocale.birthDate.error.required)
      )
    else {
      const dob = new Date(birthDate)
      if (isNaN(dob.getTime()))
        errors.push(
          getErrorSummaryItem('dob', homeLocale.birthDate.error.invalid)
        )
      else if (dob > new Date())
        errors.push(
          getErrorSummaryItem('dob', homeLocale.birthDate.error.current)
        )
    }

    //check if form is valid
    if (errors.length > 0) {
      //set the errors
      errors.forEach(({ feildId, errorMessage }) => {
        switch (feildId) {
          case 'esrf':
            setEsrfError(errorMessage)
            break
          case 'givenName':
            setGivenNameError(errorMessage)
            break
          case 'surname':
            setSurnameError(errorMessage)
            break
          case 'dob':
            setBirthDateError(errorMessage)
            break
        }
      })
      setErrorSummary(errors)
    } else {
      //make the request for status
      const body = JSON.stringify({ esrf, givenName, surname, birthDate })
      const response = await fetch('/api/checkStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (response.ok) setResponse((await response.json()) as PassportStatus)
      else if (response.status === 404) setResponse('not-found')
      else if (response.status === 422) setResponse('non-unique')
      else
        throw new Error(
          `Unhandled reponse status ${response.status} while searching foor passport status ${body}`
        )
    }
  }

  const getStatusText = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return homeLocale.status.ACCEPTED
      case 'COMPLETED':
        return homeLocale.status.COMPLETED
      case 'PROCESSING':
        return homeLocale.status.PROCESSING
      case 'REJECTED':
        return homeLocale.status.REJECTED
      default:
        return status
    }
  }

  return (
    <Layout>
      <h1 className="mb-4">{homeLocale.header}</h1>
      {!response ? (
        <div>
          <p>{homeLocale.description}</p>
          {errorSummary.length > 0 && (
            <ErrorSummary
              id="error-summary-get-status"
              summary={commonLocale.foundErrors}
              errors={errorSummary}
            />
          )}
          <form onSubmit={handleSubmit} id="form-get-status">
            <InputField
              id="esrf"
              name="FileNumber"
              label={homeLocale.esrf.label}
              required
              textRequired={commonLocale.required}
              value={esrf}
              onChange={(e) => setEsrf(e.currentTarget.value)}
              errorMessage={esrfError}
            />
            <InputField
              id="givenName"
              name="givenName"
              label={homeLocale.givenName.label}
              required
              textRequired={commonLocale.required}
              value={givenName}
              onChange={(e) => setGivenName(e.currentTarget.value)}
              errorMessage={givenNameError}
            />
            <InputField
              id="surname"
              name="surname"
              label={homeLocale.surname.label}
              required
              textRequired={commonLocale.required}
              value={surname}
              onChange={(e) => setSurname(e.currentTarget.value)}
              errorMessage={surnameError}
            />
            <InputField
              id="dob"
              name="birthDate"
              label={homeLocale.birthDate.label}
              required
              textRequired={commonLocale.required}
              value={birthDate}
              onChange={(e) => setBirthDate(e.currentTarget.value)}
              errorMessage={birthDateError}
              type="date"
            />
            <ActionButton
              type="submit"
              text={homeLocale.checkStatus}
              style="primary"
            />
          </form>
        </div>
      ) : (
        <div id="response">
          {response === 'not-found' || response === 'non-unique' ? (
            <p className=" mb-6 text-2xl">{homeLocale.unableToFindStatus}</p>
          ) : (
            <p className="mb-6 text-2xl">
              {homeLocale.statusIs}{' '}
              <strong>{getStatusText(response.status)}</strong>.
            </p>
          )}
          <p className="mb-6 text-2xl">{homeLocale.checkAgain}</p>
          <ActionButton
            onClick={handleReset}
            text={homeLocale.resetForm}
            style="primary"
          />
        </div>
      )}
    </Layout>
  )
}

export default Home
