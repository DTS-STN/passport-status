import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CheckStatusRequestBody } from './api/check-status'
import { useCheckStatus } from '../hooks/api/useCheckStatus'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItem,
} from '../components/ErrorSummary'
import StatusInfo from '../components/StatusInfo'

const Status: FC = () => {
  const { t } = useTranslation('status')

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
        .required('esrf.error.required')
        .length(8, 'esrf.error.length'),
      givenName: Yup.string().required('given-name.error.required'),
      surname: Yup.string().required('surname.error.required'),
      birthDate: Yup.date()
        .required('birth-date.error.required')
        .max(new Date(), 'birth-date.error.current'),
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

  const useCheckStatusEnabled = formik.isValid && formSubmitted
  const {
    isLoading: isCheckStatusLoading,
    error: checkStatusError,
    data: checkStatusReponse,
    remove: removeCheckStatusResponse,
  } = useCheckStatus(
    useCheckStatusEnabled
      ? formik.values
      : {
          birthDate: '',
          esrf: '',
          givenName: '',
          surname: '',
        },
    {
      enabled: useCheckStatusEnabled,
    }
  )

  const errorSummary = useMemo<ErrorSummaryItem[]>(() => {
    return Object.keys(formik.errors)
      .filter((key) => !!formik.errors[key as keyof typeof formik.errors])
      .map((key) =>
        getErrorSummaryItem(
          key,
          t(formik.errors[key as keyof typeof formik.errors] as string)
        )
      )
  }, [formik, t])

  // const handleReset: MouseEventHandler<HTMLButtonElement> = useCallback(
  //   (e) => {
  //     e.preventDefault()
  //     formik.resetForm()
  //   },
  //   [formik]
  // )

  const handleGoBack: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setFormSubmitted(false)
      removeCheckStatusResponse()
    },
    [removeCheckStatusResponse]
  )

  //if the api failed, fail hard to show error page
  if (checkStatusError) throw new Error(checkStatusError.message)

  return (
    <Layout>
      <h1 className="mb-4">{t('header')}</h1>
      {checkStatusReponse ? (
        <StatusInfo
          handleGoBackClick={() => Router.push('/landing')}
          goBackText={t('reset')}
          goBackStyle="primary"
          checkAgainText={t('check-again')}
        >
          <p className="mb-6 text-2xl">
            {`${t('status-is')} `}
            <strong>
              {t(`status.${checkStatusReponse.status}`, {
                defaultValue: checkStatusReponse.status,
              })}
            </strong>
            .
          </p>
        </StatusInfo>
      ) : checkStatusReponse === null ? (
        <StatusInfo
          handleGoBackClick={handleGoBack}
          goBackText={t('go-back')}
          goBackStyle="primary"
          checkAgainText={t('check-again')}
        >
          <p className=" mb-6 text-2xl">{t('unable-to-find-status')}</p>
        </StatusInfo>
      ) : (
        <form onSubmit={formik.handleSubmit} id="form-get-status">
          <p>{t('description')}</p>
          {errorSummary.length > 0 && (
            <ErrorSummary
              id="error-summary-get-status"
              summary={t('common:found-errors', {
                count: errorSummary.length,
              })}
              errors={errorSummary}
            />
          )}
          <InputField
            id="esrf"
            name="esrf"
            label={t('esrf.label')}
            onChange={formik.handleChange}
            value={formik.values.esrf}
            errorMessage={formik.errors.esrf && t(formik.errors.esrf)}
            textRequired={t('common:required')}
            required
          />
          <InputField
            id="givenName"
            name="givenName"
            label={t('given-name.label')}
            onChange={formik.handleChange}
            value={formik.values.givenName}
            errorMessage={formik.errors.givenName && t(formik.errors.givenName)}
            textRequired={t('common:required')}
            required
          />
          <InputField
            id="surname"
            name="surname"
            label={t('surname.label')}
            onChange={formik.handleChange}
            value={formik.values.surname}
            errorMessage={formik.errors.surname && t(formik.errors.surname)}
            textRequired={t('common:required')}
            required
          />
          <InputField
            id="birthDate"
            name="birthDate"
            type="date"
            label={t('birth-date.label')}
            onChange={formik.handleChange}
            value={formik.values.birthDate}
            errorMessage={formik.errors.birthDate && t(formik.errors.birthDate)}
            textRequired={t('common:required')}
            required
          />
          <ActionButton
            disabled={isCheckStatusLoading}
            type="submit"
            text={t('check-status')}
            style="primary"
          />
        </form>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'status',
    ])),
  },
})

export default Status
