import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItems,
  goToErrorSummary,
} from '../components/ErrorSummary'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import Modal from '../components/Modal'
import useEmailEsrf from '../lib/useEmailEsrf'
import { EmailEsrfApiRequestBody } from '../lib/types'
import IdleTimeout from '../components/IdleTimeout'
import ExternalLink from '../components/ExternalLink'
import DateSelectField, {
  DateSelectFieldOnChangeEvent,
} from '../components/DateSelectField'
import { NextSeo } from 'next-seo'

const initialValues: EmailEsrfApiRequestBody = {
  dateOfBirth: '',
  email: '',
  givenName: '',
  locale: '',
  surname: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required('email.error.required')
    .email('email.error.valid'),
  givenName: Yup.string().required('given-name.error.required'),
  surname: Yup.string().required('surname.error.required'),
  dateOfBirth: Yup.date()
    .required('date-of-birth.error.required')
    .max(new Date(), 'date-of-birth.error.current'),
})

const Email: FC = () => {
  const { t } = useTranslation('email')
  const router = useRouter()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToHeading = useCallback(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    headingRef.current?.focus()
  }, [headingRef])

  const {
    error: emailEsrfError,
    isLoading: isEmailEsrfLoading,
    isSuccess: isEmailEsrfSuccess,
    mutate: emailEsrf,
  } = useEmailEsrf({ onSuccess: () => scrollToHeading() })

  const {
    errors: formikErrors,
    handleChange: handleFormikChange,
    handleSubmit: handleFormikSubmit,
    setFieldValue: setFormikFieldValue,
    values: formikValues,
  } = useFormik<EmailEsrfApiRequestBody>({
    initialValues,
    onSubmit: (values) =>
      emailEsrf({ ...values, locale: router.locale ?? 'en' }),
    validate: async (values) => {
      // manually validate with yup, scroll and focus error summary section element on errors
      try {
        await validateYupSchema(values, validationSchema)
        // empty errors
        return {}
      } catch (yupError) {
        goToErrorSummary('error-summary-email-esrf')
        return yupToFormErrors(yupError)
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
  })

  const errorSummaryItems = useMemo<ErrorSummaryItem[]>(
    () => getErrorSummaryItems(formikErrors, t),
    [formikErrors, t]
  )

  const handleOnDateOfBirthChange: DateSelectFieldOnChangeEvent = useCallback(
    (dateString) => {
      setFormikFieldValue('dateOfBirth', dateString)
    },
    [setFormikFieldValue]
  )

  const handleOnCancelClick = useCallback(() => setModalOpen(true), [])

  const handleOnModalClose = useCallback(() => setModalOpen(false), [])

  const handleOnModalYesButtonClick = useCallback(
    () => router.push('/landing'),
    [router]
  )

  //if the api failed, fail hard to show error page
  if (emailEsrfError) throw emailEsrfError

  return (
    <Layout>
      <NextSeo title={t('page-title')} />
      <IdleTimeout />
      <h1 ref={headingRef} className="h1" tabIndex={-1}>
        {t('header')}
      </h1>

      {isEmailEsrfSuccess ? (
        <div id="response-result">
          <h2 className="h2">{t('email-confirmation-msg.request-received')}</h2>
          <p>{t('email-confirmation-msg.if-exists')}</p>
          <p>
            {t('email-confirmation-msg.please-contact')}{' '}
            <b>{t('common:phone-number')}</b>.
          </p>
          <div className="mt-10">
            <h3 className="h3 text-blue-normal">
              {t('common:feedback-link-header')}
            </h3>
            <Trans i18nKey={'common:feedback-link'}>
              Insert feedback{' '}
              <ExternalLink href={t('common:feedback-link-url')}>
                Link
              </ExternalLink>
            </Trans>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormikSubmit} id="form-email-esrf">
          <p>
            <strong>{t('header-messages.matches')}</strong>
          </p>
          <ul className="list-disc space-y-2 pl-10 mb-5">
            <li>{t('header-messages.list.item-1')}</li>
            <li>{t('header-messages.list.item-2')}</li>
            <li>{t('header-messages.list.item-3')}</li>
            <li>{t('header-messages.list.item-4')}</li>
          </ul>
          {errorSummaryItems.length > 0 && (
            <ErrorSummary
              id="error-summary-email-esrf"
              summary={t('common:found-errors', {
                count: errorSummaryItems.length,
              })}
              errors={errorSummaryItems}
            />
          )}
          <InputField
            id="email"
            name="email"
            type="email"
            label={t('email.label')}
            onChange={handleFormikChange}
            value={formikValues.email}
            errorMessage={formikErrors.email && t(formikErrors.email)}
            textRequired={t('common:required')}
            required
            helpMessage={
              <p>
                {t('help-message.email')}{' '}
                <b>{t('help-message.for-child.application')}</b>
                {t('help-message.for-child.use-exactly')}
              </p>
            }
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
          <DateSelectField
            id="dateOfBirth"
            label={t('date-of-birth.label')}
            onChange={handleOnDateOfBirthChange}
            value={formikValues.dateOfBirth}
            errorMessage={
              formikErrors.dateOfBirth && t(formikErrors.dateOfBirth)
            }
            textRequired={t('common:required')}
            required
          />
          <div className="flex gap-2 flex-wrap">
            <ActionButton
              id="btn-submit"
              disabled={isEmailEsrfLoading}
              type="submit"
              text={t('email-esrf')}
              style="primary"
            />
            <ActionButton
              id="btn-cancel"
              disabled={isEmailEsrfLoading}
              text={t('common:modal-go-back.cancel-button')}
              onClick={handleOnCancelClick}
            />
          </div>
        </form>
      )}
      <Modal
        open={modalOpen}
        onClose={handleOnModalClose}
        actionButtons={[
          {
            text: t('common:modal-go-back.yes-button'),
            onClick: handleOnModalYesButtonClick,
            style: 'primary',
          },
          {
            text: t('common:modal-go-back.no-button'),
            onClick: handleOnModalClose,
          },
        ]}
        header={t('common:modal-go-back.header')}
      >
        <p>{t('common:modal-go-back.description')}</p>
      </Modal>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'email'])),
  },
})

export default Email
