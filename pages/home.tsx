import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react'
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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useTranslation from 'next-translate/useTranslation'

const Home: FC = () => {
  const { t } = useTranslation()
  const commonLocale = useCommonLocale()
  const homeLocale = useHomeLocale()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const formik = useFormik<CheckStatusRequestBody>({
    initialValues: {
      birthDate: '',
      esrf: '',
      givenName: '',
      surname: '',
    },
    validationSchema: Yup.object({
      esrf: Yup.string()
        .required(homeLocale.esrf.error.required)
        .length(8, homeLocale.esrf.error.length),
      givenName: Yup.string().required(homeLocale.givenName.error.required),
      surname: Yup.string().required(homeLocale.surname.error.required),
      birthDate: Yup.date()
        .required(homeLocale.birthDate.error.required)
        .max(new Date(), homeLocale.birthDate.error.current),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onReset: () => {
      setFormSubmitted(false)
      removeCheckStatusResponse()
    },
    onSubmit: (values) => {
      setFormSubmitted(true)
    },
  })

  const {
    isLoading: isCheckStatusLoading,
    error: checkStatusError,
    data: checkStatusReponse,
    remove: removeCheckStatusResponse,
  } = useCheckStatus(formik.values, { enabled: formSubmitted })

  const errorSummary = useMemo<ErrorSummaryItem[]>(() => {
    return Object.keys(formik.errors)
      .filter((key) => !!formik.errors[key as keyof typeof formik.errors])
      .map((key) =>
        getErrorSummaryItem(
          key,
          formik.errors[key as keyof typeof formik.errors] as string
        )
      )
  }, [formik])

  const handleReset: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      formik.resetForm()
    },
    [formik]
  )

  const handleGoBack: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setFormSubmitted(false)
      removeCheckStatusResponse()
    },
    [removeCheckStatusResponse]
  )

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
        <PassportStatusUnavailable handleGoBackClick={handleGoBack} />
      ) : (
        <>
          <h1 className="mb-4">{homeLocale.header}</h1>
          <div>
            <p>{homeLocale.description}</p>
            {errorSummary.length > 0 && (
              <ErrorSummary
                id="error-summary-get-status"
                summary={t('common:found-errors')}
                errors={errorSummary}
              />
            )}
            <form onSubmit={formik.handleSubmit} id="form-get-status">
              <InputField
                id="esrf"
                name="esrf"
                label={homeLocale.esrf.label}
                onChange={formik.handleChange}
                value={formik.values.esrf}
                errorMessage={formik.errors.esrf}
                textRequired={commonLocale.required}
                required
              />
              <InputField
                id="givenName"
                name="givenName"
                label={homeLocale.givenName.label}
                onChange={formik.handleChange}
                value={formik.values.givenName}
                errorMessage={formik.errors.givenName}
                textRequired={commonLocale.required}
                required
              />
              <InputField
                id="surname"
                name="surname"
                label={homeLocale.surname.label}
                onChange={formik.handleChange}
                value={formik.values.surname}
                errorMessage={formik.errors.surname}
                textRequired={commonLocale.required}
                required
              />
              <InputField
                id="birthDate"
                name="birthDate"
                type="date"
                label={homeLocale.birthDate.label}
                onChange={formik.handleChange}
                value={formik.values.birthDate}
                errorMessage={formik.errors.birthDate}
                textRequired={commonLocale.required}
                required
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
