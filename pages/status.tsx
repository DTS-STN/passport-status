import {
  FC,
  MouseEventHandler,
  ChangeEventHandler,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CheckStatusApiRequestQuery } from '../lib/types'
import { useCheckStatus } from '../lib/useCheckStatus'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItem,
} from '../components/ErrorSummary'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import CheckStatusInfo from '../components/CheckStatusInfo'
import Modal from '../components/Modal'
import { useIdleTimer } from 'react-idle-timer'
import { deleteCookie } from 'cookies-next'

const initialValues: CheckStatusApiRequestQuery = {
  dateOfBirth: '',
  esrf: '',
  givenName: '',
  surname: '',
}

const Status: FC = () => {
  const { t } = useTranslation('status')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [isIdle, setIsIdle] = useState(false)

  const handleOnIdleTimerIdle = useCallback(() => {
    setIsIdle(true)
    setModalOpen(true)
  }, [])

  const { reset: resetIdleTimer } = useIdleTimer({
    onIdle: handleOnIdleTimerIdle,
    //15 minute timeout
    timeout: 15 * 60 * 1000,
  })

  const handleOnModalRedirectButtonClick = useCallback(() => {
    //If user is idle and selects option to go back, clear the cookie so they get redirected to /expectations instead
    if (isIdle) {
      deleteCookie('agreed-to-email-esrf-terms')
    }
    router.push('/landing')
  }, [isIdle, router])

  const handleOnModalResetButtonClick = useCallback(() => {
    setModalOpen(false)
    if (isIdle) {
      setIsIdle(false)
      resetIdleTimer()
    }
  }, [isIdle, resetIdleTimer])

  const lsItems = t<string, LinkSummaryItem[]>('common:program-links', {
    returnObjects: true,
  })

  const formik = useFormik<CheckStatusApiRequestQuery>({
    initialValues,
    validationSchema: Yup.object({
      esrf: Yup.string().required('esrf.error.required'),
      givenName: Yup.string().required('given-name.error.required'),
      surname: Yup.string().required('surname.error.required'),
      dateOfBirth: Yup.date()
        .required('date-of-birth.error.required')
        .max(new Date(), 'date-of-birth.error.current'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onReset: (_, { setStatus }) => {
      setStatus(undefined)
      removeCheckStatusResponse()
    },
    onSubmit: (_, { setStatus }) => {
      setStatus('submitted')
    },
  })

  const {
    isLoading: isCheckStatusLoading,
    error: checkStatusError,
    data: checkStatusResponse,
    remove: removeCheckStatusResponse,
  } = useCheckStatus(
    formik.status === 'submitted' ? formik.values : initialValues,
    {
      enabled: formik.status === 'submitted',
      onSuccess: () => window.scrollTo(0, 0),
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

  const handleOnGoBackClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault()
      if (checkStatusResponse) {
        await router.push('/landing')
        return
      }
      formik.setStatus(undefined)
      removeCheckStatusResponse()
      window.scrollTo(0, 0)
    },
    [formik, removeCheckStatusResponse, checkStatusResponse, router]
  )

  const handleOnESRFChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      formik.setFieldValue(target.name, target.value.replace(/[^a-z0-9]/gi, ''))
    },
    [formik]
  )

  //if the api failed, fail hard to show error page
  if (checkStatusError) throw checkStatusError

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="h1">{t('header')}</h1>
      {(() => {
        if (checkStatusResponse !== undefined) {
          return (
            <>
              <CheckStatusInfo
                id={
                  checkStatusResponse === null
                    ? 'response-no-result'
                    : 'response-result'
                }
                onGoBackClick={handleOnGoBackClick}
                goBackText={
                  checkStatusResponse === null ? t('previous') : t('reset')
                }
                goBackStyle="primary"
                checkAgainText={t('check-again')}
                checkStatusResponse={checkStatusResponse}
              />
              <LinkSummary
                title={t('common:contact-program')}
                links={lsItems}
              ></LinkSummary>
            </>
          )
        }

        return (
          <form onSubmit={formik.handleSubmit} id="form-get-status">
            <p>{t('header-messages.fill-in-field')}</p>
            <p>
              <strong>{t('header-messages.matches')}</strong>
            </p>
            <p>{t('header-messages.for-child')}</p>
            <p>{t('header-messages.passport-officer')}</p>
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
              onChange={handleOnESRFChange}
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
              errorMessage={
                formik.errors.givenName && t(formik.errors.givenName)
              }
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
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              label={t('date-of-birth.label')}
              onChange={formik.handleChange}
              value={formik.values.dateOfBirth}
              errorMessage={
                formik.errors.dateOfBirth && t(formik.errors.dateOfBirth)
              }
              textRequired={t('common:required')}
              max={'9999-12-31'}
              required
            />
            <div className="flex gap-2 flex-wrap">
              <ActionButton
                id="btn-submit"
                disabled={isCheckStatusLoading}
                type="submit"
                text={t('check-status')}
                style="primary"
              />
              <ActionButton
                id="btn-cancel"
                disabled={isCheckStatusLoading}
                text={t('common:modal.cancel-button')}
                onClick={() => setModalOpen(true)}
              />
            </div>
          </form>
        )
      })()}
      <Modal
        open={modalOpen}
        actionButtons={[
          {
            text: t('common:modal.yes-button'),
            onClick: handleOnModalRedirectButtonClick,
            style: 'primary',
            type: 'button',
          },
          {
            text: t('common:modal.no-button'),
            onClick: handleOnModalResetButtonClick,
            style: 'default',
            type: 'button',
          },
        ]}
      >
        {isIdle ? t('common:modal.idle') : t('common:modal.description')}
      </Modal>
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
