import {
  FC,
  MouseEventHandler,
  ChangeEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { CheckStatusApiRequestQuery } from '../lib/types'
import { useCheckStatus } from '../lib/useCheckStatus'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItems,
  goToErrorSummary,
} from '../components/ErrorSummary'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import CheckStatusInfo from '../components/CheckStatusInfo'
import Modal from '../components/Modal'
import IdleTimeout from '../components/IdleTimeout'

const initialValues: CheckStatusApiRequestQuery = {
  dateOfBirth: '',
  esrf: '',
  givenName: '',
  surname: '',
}

const validationSchema = Yup.object({
  esrf: Yup.string().required('esrf.error.required'),
  givenName: Yup.string().required('given-name.error.required'),
  surname: Yup.string().required('surname.error.required'),
  dateOfBirth: Yup.date()
    .required('date-of-birth.error.required')
    .max(new Date(), 'date-of-birth.error.current'),
})

const Status: FC = () => {
  const { t } = useTranslation('status')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const {
    errors: formikErrors,
    handleChange: handleFormikChange,
    handleSubmit: handleFormikSubmit,
    setFieldValue: setFormikFieldValue,
    setStatus: setFormikStatus,
    status: formikStatus,
    values: formikValues,
  } = useFormik<CheckStatusApiRequestQuery>({
    initialValues,
    onSubmit: (_, { setStatus }) => {
      setStatus('submitted')
    },
    validate: async (values) => {
      // manually validate with yup, scroll and focus error summary section element on errors
      try {
        await validateYupSchema(values, validationSchema)
        // empty errors
        return {}
      } catch (yupError) {
        goToErrorSummary('error-summary-get-status')
        return yupToFormErrors(yupError)
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
  })

  const {
    data: checkStatusResponse,
    error: checkStatusError,
    isLoading: isCheckStatusLoading,
    remove: removeCheckStatusResponse,
  } = useCheckStatus(
    formikStatus === 'submitted' ? formikValues : initialValues,
    {
      enabled: formikStatus === 'submitted',
      onSuccess: () => window.scrollTo(0, 0),
    }
  )

  const errorSummaryItems = useMemo<ErrorSummaryItem[]>(
    () => getErrorSummaryItems(formikErrors, t),
    [formikErrors, t]
  )

  const handleOnGoBackClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault()
      if (checkStatusResponse) {
        await router.push('/landing')
        return
      }
      setFormikStatus(undefined)
      removeCheckStatusResponse()
      window.scrollTo(0, 0)
    },
    [checkStatusResponse, setFormikStatus, removeCheckStatusResponse, router]
  )

  const handleOnESRFChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setFormikFieldValue(target.name, target.value.replace(/[^a-z0-9]/gi, ''))
    },
    [setFormikFieldValue]
  )

  //if the api failed, fail hard to show error page
  if (checkStatusError) throw checkStatusError

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <IdleTimeout />
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
                links={t<string, LinkSummaryItem[]>('common:program-links', {
                  returnObjects: true,
                })}
              ></LinkSummary>
            </>
          )
        }

        return (
          <form onSubmit={handleFormikSubmit} id="form-get-status">
            <p>{t('header-messages.fill-in-field')}</p>
            <p>
              <strong>{t('header-messages.matches')}</strong>
            </p>
            <p>{t('header-messages.for-child')}</p>
            <p>{t('header-messages.passport-officer')}</p>
            {errorSummaryItems.length > 0 && (
              <ErrorSummary
                id="error-summary-get-status"
                summary={t('common:found-errors', {
                  count: errorSummaryItems.length,
                })}
                errors={errorSummaryItems}
              />
            )}
            <InputField
              id="esrf"
              name="esrf"
              label={t('esrf.label')}
              onChange={handleOnESRFChange}
              value={formikValues.esrf}
              errorMessage={formikErrors.esrf && t(formikErrors.esrf)}
              textRequired={t('common:required')}
              required
            />
            <InputField
              id="givenName"
              name="givenName"
              label={t('given-name.label')}
              onChange={handleFormikChange}
              value={formikValues.givenName}
              errorMessage={formikErrors.givenName && t(formikErrors.givenName)}
              textRequired={t('common:required')}
              required
            />
            <InputField
              id="surname"
              name="surname"
              label={t('surname.label')}
              onChange={handleFormikChange}
              value={formikValues.surname}
              errorMessage={formikErrors.surname && t(formikErrors.surname)}
              textRequired={t('common:required')}
              required
            />
            <InputField
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              label={t('date-of-birth.label')}
              onChange={handleFormikChange}
              value={formikValues.dateOfBirth}
              errorMessage={
                formikErrors.dateOfBirth && t(formikErrors.dateOfBirth)
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
            onClick: () => router.push('/landing'),
            style: 'primary',
          },
          {
            text: t('common:modal.no-button'),
            onClick: () => setModalOpen(false),
          },
        ]}
      >
        {t('common:modal.description')}
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
