import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CheckStatusRequestBody } from '../lib/StatusTypes'
import { useCheckStatus } from '../lib/CheckStatusHook'
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

const initialValues: CheckStatusRequestBody = {
  birthDate: '',
  esrf: '',
  givenName: '',
  surname: '',
}

const Status: FC = () => {
  const { t } = useTranslation('status')
  const [modalOpen, setModalOpen] = useState(false)

  const lsItems = t<string, LinkSummaryItem[]>('no-match-status-links', {
    returnObjects: true,
  })

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
                <p className="mb-6 text-2xl">
                  {`${t('status-is')} `}
                  <strong id="response-status">
                    {t(`status.${checkStatusReponse.status}`, {
                      defaultValue: checkStatusReponse.status,
                    })}
                  </strong>
                  .
                </p>
              </StatusInfo>
              <LinkSummary
                title={t('other-ways-to-status')}
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
                goBackText={t('go-back')}
                goBackStyle="primary"
                checkAgainText={t('check-again')}
              >
                <p className=" mb-6 text-2xl">{t('unable-to-find-status')}</p>
              </StatusInfo>
              <LinkSummary
                title={t('no-match-title')}
                links={lsItems}
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
              id="birthDate"
              name="birthDate"
              type="date"
              label={t('birth-date.label')}
              onChange={formik.handleChange}
              value={formik.values.birthDate}
              errorMessage={
                formik.errors.birthDate && t(formik.errors.birthDate)
              }
              textRequired={t('common:required')}
              required
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
                  buttonText={t('cancel-modal.cancel-button')}
                  description={t('cancel-modal.description')}
                  isOpen={modalOpen}
                  onClick={() => setModalOpen(!modalOpen)}
                  buttons={[
                    {
                      text: t('cancel-modal.yes-button'),
                      onClick: () => Router.push('/landing'),
                      style: 'primary',
                      type: 'button',
                    },
                    {
                      text: t('cancel-modal.no-button'),
                      onClick: () => setModalOpen(!modalOpen),
                      style: 'primary',
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
