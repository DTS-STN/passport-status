import { MouseEventHandler, useCallback, useMemo, useState } from 'react'

import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import ActionButton from '../components/ActionButton'
import AlertBlock from '../components/AlertBlock'
import AlertSection from '../components/AlertSection'
import DateSelectField, {
  DateSelectFieldOnChangeEvent,
} from '../components/DateSelectField'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItems,
  goToErrorSummary,
} from '../components/ErrorSummary'
import ExternalLink from '../components/ExternalLink'
import IdleTimeout from '../components/IdleTimeout'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { EmailEsrfApiRequestBody } from '../lib/types'
import useEmailEsrf from '../lib/useEmailEsrf'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

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

const scrollToHeading = () => {
  setTimeout(() => {
    const heading =
      document.querySelector<HTMLHeadingElement>('h1[tabIndex="-1"]')
    if (!heading) return
    heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
    heading.focus()
  }, 300)
}

const Email = () => {
  const { t } = useTranslation(['email', 'common'])

  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const {
    error: emailEsrfError,
    isPending: isEmailEsrfPending,
    isSuccess: isEmailEsrfSuccess,
    mutate: emailEsrf,
    reset: resetEmailEsrf,
  } = useEmailEsrf({ onSuccess: () => scrollToHeading() })

  const {
    errors: formikErrors,
    handleChange: handleFormikChange,
    handleSubmit: handleFormikSubmit,
    setFieldValue: setFormikFieldValue,
    resetForm: resetFormik,
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
    () =>
      getErrorSummaryItems(formikErrors, t).map((item) => {
        if (item.feildId !== 'dateOfBirth') return item
        // field id should target the year select input
        return { ...item, feildId: 'dateOfBirth-year' }
      }),
    [formikErrors, t],
  )

  const handleOnDateOfBirthChange: DateSelectFieldOnChangeEvent = useCallback(
    (dateString) => {
      setFormikFieldValue('dateOfBirth', dateString)
    },
    [setFormikFieldValue],
  )

  const handleOnCancelClick = useCallback(() => setModalOpen(true), [])

  const handleOnModalClose = useCallback(() => setModalOpen(false), [])

  const handleOnModalYesButtonClick = useCallback(() => {
    router.push('/landing')
  }, [router])

  const handleOnNewFileRequest: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.preventDefault()
        resetFormik()
        resetEmailEsrf()
        scrollToHeading()
      },
      [resetEmailEsrf, resetFormik],
    )

  //if the api failed, fail hard to show error page
  if (emailEsrfError) throw emailEsrfError

  return (
    <Layout>
      <NextSeo
        title={t('header')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <IdleTimeout />

      {isEmailEsrfSuccess ? (
        <div id="response-result">
          <h1 className="h1" tabIndex={-1}>
            {t('email-confirmation-msg.request-received')}
          </h1>
          <AlertBlock page="email" />
          <p>
            <Trans i18nKey="email-confirmation-msg.if-exists" ns="email" />
          </p>
          <p>{t('email-confirmation-msg.may-not-receive')}</p>
          <ul className="mb-5 list-disc space-y-2 pl-10">
            <li>
              <Trans
                i18nKey="email-confirmation-msg.may-not-receive-list.item-1"
                ns="email"
              />
            </li>
            <li>{t('email-confirmation-msg.may-not-receive-list.item-2')}</li>
          </ul>
          <p>{t('email-confirmation-msg.dont-receive')}</p>
          <ul className="mb-5 list-disc space-y-2 pl-10">
            <li>
              <Trans
                i18nKey="email-confirmation-msg.dont-receive-list.item-1"
                ns="email"
              />
            </li>
            <li>{t('email-confirmation-msg.dont-receive-list.item-2')}</li>
          </ul>
          <p>
            <Trans
              i18nKey={'email-confirmation-msg.please-contact'}
              ns="email"
              components={{
                Link: <ExternalLink href={t('common:contact-us-link')} />,
              }}
            />
          </p>
          <div className="my-8">
            <ActionButton
              id="get-another-file-number"
              type="button"
              text={t('request-another')}
              onClick={handleOnNewFileRequest}
              style="primary"
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="h1" tabIndex={-1}>
            {t('header')}
          </h1>
          <AlertBlock page="email" />
          <form onSubmit={handleFormikSubmit} id="form-email-esrf">
            <p className="max-w-prose">
              <Trans i18nKey="header-messages.matches" ns="email" />
            </p>
            <ul className="mb-5 list-disc space-y-2 pl-10">
              <li>{t('header-messages.list.item-1')}</li>
              <li>{t('header-messages.list.item-2')}</li>
              <li>
                <Trans i18nKey="header-messages.list.item-3" ns="email" />
              </li>
              <li>{t('header-messages.list.item-4')}</li>
            </ul>

            <AlertSection type="info" className="mb-5 max-w-prose">
              <p>
                <Trans i18nKey="one-name" ns="email" />
              </p>
            </AlertSection>

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
              errorMessage={formikErrors.email && t(formikErrors.email as any)}
              textRequired={t('common:required')}
              required
              helpMessage={t('email.help-message')}
              helpMessageSecondary={
                <Trans i18nKey="email.help-message-secondary" ns="email" />
              }
            />
            <InputField
              id="givenName"
              name="givenName"
              label={t('given-name.label')}
              onChange={handleFormikChange}
              value={formikValues.givenName}
              errorMessage={
                formikErrors.givenName && t(formikErrors.givenName as any)
              }
              textRequired={t('common:required')}
              required
              helpMessage={t('given-name.help-message')}
            />
            <InputField
              id="surname"
              name="surname"
              label={t('surname.label')}
              onChange={handleFormikChange}
              value={formikValues.surname}
              errorMessage={
                formikErrors.surname && t(formikErrors.surname as any)
              }
              textRequired={t('common:required')}
              required
              helpMessage={t('surname.help-message')}
            />
            <DateSelectField
              id="dateOfBirth"
              label={t('date-of-birth.label')}
              onChange={handleOnDateOfBirthChange}
              value={formikValues.dateOfBirth}
              errorMessage={
                formikErrors.dateOfBirth && t(formikErrors.dateOfBirth as any)
              }
              textRequired={t('common:required')}
              required
              helpMessage={t('date-of-birth.help-message')}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              <ActionButton
                id="btn-submit"
                disabled={isEmailEsrfPending}
                type="submit"
                text={t('email-esrf')}
                style="primary"
              />
              <ActionButton
                id="btn-cancel"
                disabled={isEmailEsrfPending}
                text={t('common:modal-go-back.cancel-button')}
                onClick={handleOnCancelClick}
              />
            </div>
          </form>
        </div>
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
    ...(await pageWithServerSideTranslations(locale, 'email')),
  },
})

export default Email
