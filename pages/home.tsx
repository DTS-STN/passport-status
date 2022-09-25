import commonEn from '../locales/en'
import commonFr from '../locales/fr'
import en from '../locales/home/en'
import fr from '../locales/home/fr'
import InputFeild from '../components/InputField'
import ActionButton from '../components/ActionButton'
import { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import ErrorSummary from '../components/ErrorSummary'
import { GetStaticProps } from 'next'

export enum Status {
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

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
  status?: Status
}

export type CommonContent = typeof commonEn | typeof commonFr

export interface HomeProps {
  content: typeof fr | typeof en
}

export interface Error {
  feildId: string
  errorMessage: string
}

const Home: FC<HomeProps & { commonContent: CommonContent }> = ({
  content,
  commonContent,
}) => {
  const [esrf, setEsrf] = useState<string | undefined>()
  const [esrfError, setEsrfError] = useState<string | undefined>()
  const [givenName, setGivenName] = useState<string | undefined>()
  const [givenNameError, setGivenNameError] = useState<string | undefined>()
  const [surname, setSurname] = useState<string | undefined>()
  const [surnameError, setSurnameError] = useState<string | undefined>()
  const [birthDate, setBirthDate] = useState<string | undefined>()
  const [birthDateError, setBirthDateError] = useState<string | undefined>()
  const [response, setResponse] = useState<
    PassportStatus | 'not-found' | undefined
  >()
  const [errorSummary, setErrorSummary] = useState<Error[]>([])

  const getError = (id: string, msg: string): Error => ({
    feildId: id,
    errorMessage: msg,
  })

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    //clear form data, errors & results
    setErrorSummary([])
    setEsrfError(undefined)
    setGivenNameError(undefined)
    setSurnameError(undefined)
    setBirthDateError(undefined)
    setEsrf(undefined)
    setGivenName(undefined)
    setSurname(undefined)
    setBirthDate(undefined)
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

    const errors: Error[] = []

    //validate data
    if (!esrf) errors.push(getError('esrf', content.esrf.error.required))
    else if (esrf.length != 8)
      errors.push(getError('esrf', content.esrf.error.length))

    if (!givenName)
      errors.push(getError('givenName', content.givenName.error.required))

    if (!surname)
      errors.push(getError('surname', content.surname.error.required))

    if (!birthDate)
      errors.push(getError('dob', content.birthDate.error.required))
    else {
      const dob = new Date(birthDate)
      if (isNaN(dob.getTime()))
        errors.push(getError('dob', content.birthDate.error.invalid))
      else if (dob > new Date())
        errors.push(getError('dob', content.birthDate.error.current))
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
      if (response.status === 404) setResponse('not-found')
      throw `Unhandled reponse status ${response.status} while searching foor passport status ${body}`
    }
  }

  const getResponseStatusText = (status?: Status) =>
    status ? content.status[status] : status

  return (
    <>
      <h1 className="mb-4">{content.header}</h1>
      {!response ? (
        <div>
          <p>{content.description}</p>
          {errorSummary.length > 0 && (
            <ErrorSummary
              id="error-summary-get-status"
              summary={commonContent.foundErrors}
              errors={errorSummary}
            />
          )}
          <form onSubmit={handleSubmit} id="form-get-status">
            <InputFeild
              id="esrf"
              name="FileNumber"
              label={content.esrf.label}
              required
              textRequired={commonContent.required}
              value={esrf}
              onChange={(e) => setEsrf(e.currentTarget.value)}
              errorMessage={esrfError}
            />
            <InputFeild
              id="givenName"
              name="givenName"
              label={content.givenName.label}
              required
              textRequired={commonContent.required}
              value={givenName}
              onChange={(e) => setGivenName(e.currentTarget.value)}
              errorMessage={givenNameError}
            />
            <InputFeild
              id="surname"
              name="surname"
              label={content.surname.label}
              required
              textRequired={commonContent.required}
              value={surname}
              onChange={(e) => setSurname(e.currentTarget.value)}
              errorMessage={surnameError}
            />
            <InputFeild
              id="dob"
              name="birthDate"
              label={content.birthDate.label}
              required
              textRequired={commonContent.required}
              value={birthDate}
              onChange={(e) => setBirthDate(e.currentTarget.value)}
              errorMessage={birthDateError}
              type="date"
            />
            <ActionButton
              type="submit"
              text={content.checkStatus}
              style="primary"
            />
          </form>
        </div>
      ) : (
        <div id="response">
          {response !== 'not-found' ? (
            <p className="mb-6 text-2xl">
              {content.statusIs}{' '}
              <strong>{getResponseStatusText(response.status)}</strong>.
            </p>
          ) : (
            <p className=" mb-6 text-2xl">{content.unableToFindStatus}</p>
          )}
          <p className="mb-6 text-2xl">{content.checkAgain}</p>
          <ActionButton
            onClick={handleReset}
            text={content.resetForm}
            style="primary"
          />
        </div>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  return {
    props: {
      content: locale === 'fr' ? fr : en,
    },
  }
}

export default Home
