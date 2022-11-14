import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CheckStatusRequest } from '../lib/types'
import { useCheckStatus } from '../lib/useCheckStatus'
import Layout from '../components/Layout'
import InputField from '../components/InputField'
import ActionButton from '../components/ActionButton'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItem,
} from '../components/ErrorSummary'
import LinkSummary, { LinkSummaryItem } from '../components/LinkSummary'
import StatusInfo from '../components/StatusInfo'
import Modal from '../components/Modal'
import { StatusCode } from '../lib/types'

const initialValues: CheckStatusRequest = {
  dateOfBirth: '',
  esrf: '',
  givenName: '',
  surname: '',
}

const Status: FC = () => {
  const { t } = useTranslation('status')
  const [modalOpen, setModalOpen] = useState(false)

  const lsItems = t<string, LinkSummaryItem[]>('common:program-links', {
    returnObjects: true,
  })

  const formik = useFormik<CheckStatusRequest>({
    initialValues,
    validationSchema: Yup.object({
      dateOfBirth: Yup.date()
        .required('date-of-birth.error.required')
        .max(new Date(), 'date-of-birth.error.current'),
      esrf: Yup.string()
        .required('esrf.error.required')
        .max(8, 'esrf.error.length')
        .trim()
        .matches(/^[A-Za-z]/, 'esrf.error.starts-with-letter'),
      givenName: Yup.string().required('given-name.error.required'),
      surname: Yup.string().required('surname.error.required'),
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
      {(() => {
        if (checkStatusReponse) {
          return (
            <>
              <StatusInfo
                id="reponse-result"
                handleGoBackClick={() => Router.push('/landing')}
                goBackText={t('reset')}
                goBackStyle="primary"
                checkAgainText={t('check-again')}
              >
                <div>
                  <p className="mb-6 text-2xl">
                    {`${t('status-is')} `}
                    <strong id="response-status">
                      {t(`status.${checkStatusReponse.status}.label`)}
                    </strong>
                    .
                  </p>
                  <p>{t(`status.${checkStatusReponse.status}.description`)}</p>
                  {checkStatusReponse.manifestNumber &&
                    [
                      `${StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST}`,
                      `${StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX}`,
                    ].includes(checkStatusReponse.status) && (
                      <p>
                        {t(`status.${checkStatusReponse.status}.tracking`)}
                        <strong>{checkStatusReponse.manifestNumber}</strong>
                      </p>
                    )}
                </div>
              </StatusInfo>
              <LinkSummary
                title={t('common:contact-program')}
                links={lsItems}
              ></LinkSummary>
            </>
          )
        }

        if (checkStatusReponse === null) {
          return (
            <>
              <StatusInfo
                id="reponse-no-result"
                handleGoBackClick={handleGoBack}
                goBackText={t('previous')}
                goBackStyle="primary"
                checkAgainText={t('check-again')}
              >
                {/* <p className=" mb-6 text-2xl">{t('unable-to-find-status')}</p> */}
                <div>
                  <h2 className="mb-3 text-2xl">
                    {t('cannot-provide-result.title')}
                  </h2>
                  <ul className="list-disc list-inside pb-3 ml-4 space-y-4">
                    <li>{t('cannot-provide-result.reason1')}</li>
                    <li>{t('cannot-provide-result.reason2')}</li>
                    <li>{t('cannot-provide-result.reason3')}</li>
                  </ul>
                  <p>{t('please-verify')}</p>
                  <p>{t('please-wait')}</p>
                  <h2 className="mb-3 text-2xl">
                    {t('still-unable.if-still-unable')}
                  </h2>
                  <ul className="list-disc list-inside pb-6 ml-4 space-y-4">
                    <li>{t('still-unable.contact-call-center')}</li>
                    <li>{t('still-unable.visit-in-person')}</li>
                  </ul>
                </div>
              </StatusInfo>
              <LinkSummary
                title={t('no-match-title')}
                links={t<string, LinkSummaryItem[]>('common:program-links', {
                  returnObjects: true,
                })}
              ></LinkSummary>
            </>
          )
        }

        return (
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
              onChange={(event) =>
                formik.setFieldValue(
                  event.target.name,
                  event.target.value.replace(/[^a-z0-9]/gi, '')
                )
              }
              value={formik.values.esrf}
              errorMessage={formik.errors.esrf && t(formik.errors.esrf)}
              textRequired={t('common:required')}
              required
              helpMessage={t('help-message.esrf')}
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
              textRequired={t('common:required')}
              required
              helpMessage={t('help-message.date-of-birth')}
            />
            <div className="flex flex-wrap">
              <div id="button-get-status" className="py-1 pr-2">
                <ActionButton
                  disabled={isCheckStatusLoading}
                  type="submit"
                  text={t('check-status')}
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
        )
      })()}
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
