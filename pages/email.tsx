import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import { useMemo, useState, useCallback } from 'react'
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

export default function Email() {
  const { t } = useTranslation('email')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const {
    error: emailEsrfError,
    isLoading: isEmailEsrfLoading,
    isSuccess: isEmailEsrfSuccess,
    mutate: emailEsrf,
  } = useEmailEsrf()

  const {
    errors: formikErrors,
    handleChange: handleFormikChange,
    handleSubmit: handleFormikSubmit,
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

  //if the api failed, fail hard to show error page
  if (emailEsrfError) throw emailEsrfError

  return (
    <Layout
      meta={{
        author: t('common:meta.author'),
        desc: t('common:meta.desc'),
        title: t('common:meta.title'),
      }}
    >
      <IdleTimeout />
      <h1 className="h1">{t('header')}</h1>

      {isEmailEsrfSuccess ? (
        <>
          <h2 className="h2">{t('email-confirmation-msg.request-received')}</h2>
          <p>{t('email-confirmation-msg.if-exists')}</p>
          <p>
            {t('email-confirmation-msg.please-contact')}{' '}
            <b>{t('common:phone-number')}</b>.
          </p>
          <div className="mt-10">
            <Trans i18nKey={'common:feedback-link'}>
              Insert feedback <a href="https://example.com">Link</a>
            </Trans>
          </div>
        </>
      ) : (
        <form onSubmit={handleFormikSubmit} id="form-email-esrf">
          <p>{t('header-messages.fill-in-field')}</p>
          <p>
            <strong>{t('header-messages.matches')}</strong>
          </p>
          <p>{t('header-messages.for-child')}</p>
          <p>{t('header-messages.passport-officer')}</p>
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
            helpMessage={t('help-message.email')}
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
            max={'9999-12-31'}
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
              onClick={() => setModalOpen(true)}
            />
          </div>
        </form>
      )}
      <Modal
        open={modalOpen}
        actionButtons={[
          {
            text: t('common:modal-go-back.yes-button'),
            onClick: () => router.push('/landing'),
            style: 'primary',
          },
          {
            text: t('common:modal-go-back.no-button'),
            onClick: () => setModalOpen(false),
          },
        ]}
        header={t('common:modal-go-back.header')}
      >
        <p>{t('common:modal-go-back.description')}</p>
      </Modal>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'email'])),
  },
})
