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
import Error from './_error'
import { CheckStatusReponse, CheckStatusRequestBody } from './api/check-status'
import { useCheckStatus } from '../hooks/api/useCheckStatus'

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
  const [errorSummary, setErrorSummary] = useState<ErrorSummaryItem[]>([])

  const [checkStatusRequestBody, setCheckStatusRequestBody] = useState<
    CheckStatusRequestBody | undefined
  >()

  const {
    isLoading: isCheckStatusLoading,
    error: checkStatusError,
    data: checkStatusReponse,
  } = useCheckStatus(
    {
      ...(checkStatusRequestBody ?? {
        birthDate: '',
        esrf: '',
        givenName: '',
        surname: '',
      }),
    },
    { enabled: !!checkStatusRequestBody }
  )

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
    setCheckStatusRequestBody(undefined)
  }

  //validate fields return proper error message
  const getESRFError = (): string => {
    if (!esrf) return homeLocale.esrf.error.required
    else if (esrf.length != 8) return homeLocale.esrf.error.length
    else return ''
  }
  const getDOBError = (): string => {
    if (!birthDate) return homeLocale.birthDate.error.required
    else {
      const dob = new Date(birthDate)
      if (isNaN(dob.getTime())) return homeLocale.birthDate.error.invalid
      else if (dob > new Date()) return homeLocale.birthDate.error.current
      else return ''
    }
  }
  const getGivenError = (): string => {
    if (!givenName) return homeLocale.givenName.error.required
    else return ''
  }
  const getSurnameError = (): string => {
    if (!surname) return homeLocale.surname.error.required
    else return ''
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    //clear errors & results
    setErrorSummary([])
    setEsrfError(undefined)
    setGivenNameError(undefined)
    setSurnameError(undefined)
    setBirthDateError(undefined)
    setCheckStatusRequestBody(undefined)

    const errors: ErrorSummaryItem[] = []

    //set errors if any occur
    const esrfErrorMsg: string = getESRFError()
    if (esrfErrorMsg !== '') {
      errors.push(getErrorSummaryItem('esrf', esrfErrorMsg))
      setEsrfError(esrfErrorMsg)
    }
    const givennameErrorMsg: string = getGivenError()
    if (givennameErrorMsg) {
      errors.push(getErrorSummaryItem('givenName', givennameErrorMsg))
      setGivenNameError(givennameErrorMsg)
    }
    const surnameErrorMsg: string = getSurnameError()
    if (surnameErrorMsg) {
      errors.push(getErrorSummaryItem('surname', surnameErrorMsg))
      setSurnameError(surnameErrorMsg)
    }
    const dobErrorMsg: string = getDOBError()
    if (dobErrorMsg !== '') {
      errors.push(getErrorSummaryItem('dob', dobErrorMsg))
      setBirthDateError(dobErrorMsg)
    }

    //check if form is valid
    if (errors.length > 0) {
      //set the errorsummary
      setErrorSummary(errors)
    } else if (esrf && givenName && surname && birthDate) {
      setCheckStatusRequestBody({
        birthDate,
        esrf,
        givenName,
        surname,
      })
    }
  }

  return (
    <Layout>
      {checkStatusError ? (
        <Error statusCode={checkStatusError.statusCode} />
      ) : checkStatusReponse ? (
        <PassportStatusInfo
          checkStatusResponse={checkStatusReponse}
          handleGoBackClick={handleReset}
        />
      ) : checkStatusReponse === null ? (
        <PassportStatusUnavailable
          handleGoBackClick={() => setCheckStatusRequestBody(undefined)}
        />
      ) : (
        <>
          <h1 className="mb-4">{homeLocale.header}</h1>
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
                disabled={isCheckStatusLoading}
                type="submit"
                text={homeLocale.checkStatus}
                style="primary"
              />
            </form>
          </div>
        </>
      )}
    </Layout>
  )
}

export interface PassportStatusInfoProps {
  handleGoBackClick: MouseEventHandler<HTMLButtonElement>
  checkStatusResponse: CheckStatusReponse
}

export const PassportStatusInfo: FC<PassportStatusInfoProps> = ({
  checkStatusResponse,
  handleGoBackClick,
}) => {
  const homeLocale = useHomeLocale()

  const getStatusText = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'IN_EXAMINATION':
        return homeLocale.status.IN_EXAMINATION
      case 'APPROVED':
        return homeLocale.status.APPROVED
      case 'REJECTED':
        return homeLocale.status.REJECTED
      default:
        return status
    }
  }

  return (
    <div id="response">
      <p className="mb-6 text-2xl">
        {homeLocale.statusIs}{' '}
        <strong>{getStatusText(checkStatusResponse.status)}</strong>.
      </p>
      <p className="mb-6 text-2xl">{homeLocale.checkAgain}</p>
      <ActionButton
        onClick={handleGoBackClick}
        text={homeLocale.goBack}
        style="primary"
      />
    </div>
  )
}

export interface PassportStatusUnavailableProps {
  handleGoBackClick: MouseEventHandler<HTMLButtonElement>
}

export const PassportStatusUnavailable: FC<PassportStatusUnavailableProps> = ({
  handleGoBackClick,
}) => {
  const homeLocale = useHomeLocale()

  return (
    <div id="response">
      <p className=" mb-6 text-2xl">{homeLocale.unableToFindStatus}</p>
      <p className="mb-6 text-2xl">{homeLocale.checkAgain}</p>
      <ActionButton
        onClick={handleGoBackClick}
        text={homeLocale.goBack}
        style="primary"
      />
    </div>
  )
}

export default Home
