import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import { useMemo, useState } from 'react'
import ErrorSummary, {
  ErrorSummaryItem,
  GetErrorSummary,
} from '../components/ErrorSummary'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import Modal from '../components/Modal'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import useEmailEsrf from '../lib/useEmailEsrf'
import { EmailEsrfApiRequestBody } from '../lib/types'

const initialValues: EmailEsrfApiRequestBody = {
  dateOfBirth: '',
  email: '',
  givenName: '',
  surname: '',
}

export default function Email() {
  const { t } = useTranslation('email')
  const [modalOpen, setModalOpen] = useState(false)

  const {
    isLoading: isEmailEsrfLoading,
    isSuccess: isEmailEsrfSuccess,
    error: emailEsrfError,
    mutate: emailEsrf,
  } = useEmailEsrf()

  const formik = useFormik<EmailEsrfApiRequestBody>({
    initialValues,
    validationSchema: Yup.object({
      dateOfBirth: Yup.date()
        .required('date-of-birth.error.required')
        .max(new Date(), 'dateOfBirth.error.current'),
      email: Yup.string()
        .required('email.error.required')
        .email('email.error.valid'),
      givenName: Yup.string().required('given-name.error.required'),
      surname: Yup.string().required('surname.error.required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => emailEsrf(values),
  })

  const errorSummary = useMemo<ErrorSummaryItem[]>(
    () => GetErrorSummary(formik.errors, t),
    [formik, t]
  )

  if (emailEsrfError) throw emailEsrfError

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>

      {isEmailEsrfSuccess ? (
        <>
          <p className="mb-3">{t('email-confirmation-msg.request-received')}</p>
          <p className="mb-3">{t('email-confirmation-msg.please-contact')}</p>
          <p className="mb-3">{t('email-confirmation-msg.call')}</p>
          <LinkSummary
            title={t('common:contact-program')}
            links={t<string, LinkSummaryItem[]>('common:program-links', {
              returnObjects: true,
            })}
          />
        </>
      ) : (
        <form onSubmit={formik.handleSubmit} id="form-email-esrf">
          <p>{t('description')}</p>
          {errorSummary.length > 0 && (
            <ErrorSummary
              id="error-summary-email-esrf"
              summary={t('common:found-errors', {
                count: errorSummary.length,
              })}
              errors={errorSummary}
            />
          )}
          <InputField
            id="email"
            name="email"
            label={t('email.label')}
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={formik.errors.email && t(formik.errors.email)}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.email')}
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
            helpMessage={t('help-message.given-name')}
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
            helpMessage={t('help-message.surname')}
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
            max={'9999-12-31'}
            textRequired={t('common:required')}
            required
            helpMessage={t('help-message.date-of-birth')}
          />
          <div className="flex flex-wrap">
            <div className="py-1 pr-2">
              <ActionButton
                disabled={isEmailEsrfLoading}
                type="submit"
                text={t('email-esrf')}
                style="primary"
              />
            </div>
            <div className="py-1">
              <Modal
                buttonText={t('common:cancel-modal.cancel-button')}
                description={t('common:cancel-modal.description')}
                isOpen={modalOpen}
                onClick={() => setModalOpen(!modalOpen)}
                buttons={[
                  {
                    text: t('common:cancel-modal.yes-button'),
                    onClick: () => Router.push('/landing'),
                    style: 'primary',
                    type: 'button',
                  },
                  {
                    text: t('common:cancel-modal.no-button'),
                    onClick: () => setModalOpen(!modalOpen),
                    style: 'default',
                    type: 'button',
                  },
                ]}
              />
            </div>
          </div>
        </form>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'email'])),
  },
})
