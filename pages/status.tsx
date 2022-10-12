import { FC, MouseEventHandler, useCallback, useMemo } from 'react'
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
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import StatusInfo from '../components/StatusInfo'

const initialValues: CheckStatusRequestBody = {
  birthDate: '',
  esrf: '',
  givenName: '',
  surname: '',
}

const Status: FC = () => {
  const { t } = useTranslation('status')

  const noMatchHref: LinkSummaryItem[] = [
    {
      href: 'https://ircc.canada.ca/english/passport/map/map.asp',
      text: t('no-match-status-links.near-you'),
    },
    {
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/contact-passport-program.html',
      text: t('no-match-status-links.contact-program'),
    },
    {
      href: 'https://eservices.canada.ca/en/reservation/',
      text: t('no-match-status-links.appointment'),
    },
  ]

  const formik = useFormik<CheckStatusRequestBody>({
    initialValues,
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
    onReset: (_, formikHelper) => {
      formikHelper.setStatus(undefined)
      removeCheckStatusResponse()
    },
    onSubmit: async (_, formikHelper) => {
      formikHelper.setStatus('submitted')
    },
  })

  const {
    isLoading: isCheckStatusLoading,
    error: checkStatusError,
    data: checkStatusReponse,
    remove: removeCheckStatusResponse,
  } = useCheckStatus(
    formik.status === 'submitted' ? formik.values : initialValues,
    {
      enabled: formik.status === 'submitted',
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
      formik.setStatus(undefined)
      removeCheckStatusResponse()
    },
    [formik, removeCheckStatusResponse]
  )

  //if the api failed, fail hard to show error page
  if (checkStatusError) throw new Error(checkStatusError.message)

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
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
        <>
          <LinkSummary
            id={'noMatchLinkSummary'}
            links={noMatchHref}
          ></LinkSummary>
          <StatusInfo
            handleGoBackClick={handleGoBack}
            goBackText={t('go-back')}
            goBackStyle="primary"
            checkAgainText={t('check-again')}
          >
            <p className=" mb-6 text-2xl">{t('unable-to-find-status')}</p>
          </StatusInfo>
        </>
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
