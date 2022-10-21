import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import { EmailEsrfRequestBody, EmailEsrf } from '../lib/EmailEsrfHook'
import { useMemo, useState } from 'react'
import ErrorSummary, {
  ErrorSummaryItem,
  GetErrorSummary,
} from '../components/ErrorSummary'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import Modal from '../components/Modal'

export default function Email() {
  const { t } = useTranslation('email')
  const [modalOpen, setModalOpen] = useState(false)

  const initialValues: EmailEsrfRequestBody = {
    dateOfBirth: '',
    email: '',
    firstName: '',
    lastName: '',
  }
  const submittedKey = 'submitted'

  const formik = useFormik<EmailEsrfRequestBody>({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required('firstName.error.required'),
      lastName: Yup.string().required('lastName.error.required'),
      dateOfBirth: Yup.date()
        .required('dateOfBirth.error.required')
        .max(new Date(), 'dateOfBirth.error.current'),
      email: Yup.string()
        .required('email.error.required')
        .email('email.error.valid'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (_, formikHelper) => {
      formikHelper.setStatus(submittedKey)
    },
  })

  const { isLoading, error, data } = EmailEsrf(
    formik.status === submittedKey ? formik.values : formik.initialValues
  )

  const errorSummary = useMemo<ErrorSummaryItem[]>(
    () => GetErrorSummary(formik.errors, t),
    [formik, t]
  )

  return (
    <Layout
      meta={t('common:meta', { returnObjects: true })}
      header={t('common:header', { returnObjects: true })}
      footer={t('common:footer', { returnObjects: true })}
    >
      <h1 className="mb-4">{t('header')}</h1>

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
        />
        <InputField
          id="firstName"
          name="firstName"
          label={t('firstName.label')}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          errorMessage={formik.errors.firstName && t(formik.errors.firstName)}
          textRequired={t('common:required')}
          required
        />
        <InputField
          id="lastName"
          name="lastName"
          label={t('lastName.label')}
          onChange={formik.handleChange}
          value={formik.values.lastName}
          errorMessage={formik.errors.lastName && t(formik.errors.lastName)}
          textRequired={t('common:required')}
          required
        />
        <InputField
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label={t('dateOfBirth.label')}
          onChange={formik.handleChange}
          value={formik.values.dateOfBirth}
          errorMessage={
            formik.errors.dateOfBirth && t(formik.errors.dateOfBirth)
          }
          textRequired={t('common:required')}
          required
        />
        <div className="flex flex-wrap">
          <div className="py-1 pr-2">
            <ActionButton
              disabled={isLoading}
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
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'email'])),
  },
})
