import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import ActionButton from '../components/ActionButton'
import AlertBlock from '../components/AlertBlock'
import Collapse from '../components/Collapse'
import DateSelectField, {
  DateSelectFieldOnChangeEvent,
} from '../components/DateSelectField'
import ErrorSummary, {
  ErrorSummaryItem,
  getErrorSummaryItems,
  goToErrorSummary,
} from '../components/ErrorSummary'
import IdleTimeout from '../components/IdleTimeout'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import CheckStatusFileBeingProcessed from '../components/check-status-responses/CheckStatusFileBeingProcessed'
import CheckStatusNoRecord from '../components/check-status-responses/CheckStatusNoRecord'
import CheckStatusNotAcceptable from '../components/check-status-responses/CheckStatusNotAcceptable'
import CheckStatusPrinting from '../components/check-status-responses/CheckStatusPrinting'
import CheckStatusReadyForPickup from '../components/check-status-responses/CheckStatusReadyForPickup'
import CheckStatusShippingCanadaPost from '../components/check-status-responses/CheckStatusShippingCanadaPost'
import CheckStatusShippingFedex from '../components/check-status-responses/CheckStatusShippingFedex'
import { removeCheckStatus } from '../lib/removeCheckStatus'
import {
  CheckStatusApiRequestQuery,
  CheckStatusApiResponse,
  StatusCode,
} from '../lib/types'
import { useCheckStatus } from '../lib/useCheckStatus'
import { pageWithServerSideTranslations } from '../lib/utils/next-i18next-utils'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

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

const scrollToHeading = () => {
  setTimeout(() => {
    const heading =
      document.querySelector<HTMLHeadingElement>('h1[tabIndex="-1"]')
    if (!heading) return
    heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
    heading.focus()
  }, 300)
}

const Status = () => {
  const { t } = useTranslation(['status', 'common'])

  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const queryClient = useQueryClient()

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
    isPending: isCheckStatusPending,
    isSuccess: isCheckStatusSuccess,
  } = useCheckStatus(
    formikStatus === 'submitted' ? formikValues : initialValues,
    {
      enabled: formikStatus === 'submitted',
    },
  )

  useEffect(() => {
    if (isCheckStatusSuccess) {
      scrollToHeading()
    }
  }, [isCheckStatusSuccess])

  const errorSummaryItems = useMemo<ErrorSummaryItem[]>(
    () =>
      getErrorSummaryItems(formikErrors, t).map((item) => {
        if (item.feildId !== 'dateOfBirth') return item
        // field id should target the year select input
        return { ...item, feildId: 'dateOfBirth-year' }
      }),
    [formikErrors, t],
  )

  const handleOnGoBackClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault()
      if (checkStatusResponse) {
        await router.push('/landing')
        return
      }
      setFormikStatus(undefined)
      removeCheckStatus(queryClient)
      scrollToHeading()
    },
    [checkStatusResponse, setFormikStatus, queryClient, router],
  )

  const handleOnESRFChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setFormikFieldValue(target.name, target.value.replace(/[^a-z0-9]/gi, ''))
    },
    [setFormikFieldValue],
  )

  const handleOnDateOfBirthChange: DateSelectFieldOnChangeEvent = useCallback(
    (dateString) => {
      setFormikFieldValue('dateOfBirth', dateString)
    },
    [setFormikFieldValue],
  )

  const handleOnBackClick = useCallback(() => setModalOpen(true), [])

  const handleOnModalClose = useCallback(() => setModalOpen(false), [])

  const handleOnModalYesButtonClick = useCallback(() => {
    router.push('/landing')
  }, [router])

  function getTitleHeader(
    checkStatusResponse: CheckStatusApiResponse | null | undefined,
  ): string {
    if (checkStatusResponse === undefined) return t('header')
    switch (checkStatusResponse?.status) {
      case StatusCode.FILE_BEING_PROCESSED:
        return t('being-processed.received')
      case StatusCode.PASSPORT_ISSUED_READY_FOR_PICKUP:
        return t('ready-for-pickup.has-been-printed')
      case StatusCode.PASSPORT_IS_PRINTING:
        return t('printing.in-printing')
      case StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST:
        return t('shipped-canada-post.header')
      case StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX:
        return t('shipped-fedex.header')
      case StatusCode.NOT_ACCEPTABLE_FOR_PROCESSING:
        return t('not-acceptable.cannot-process')
      default:
        return t('no-record.cannot-give-status.description')
    }
  }

  const getStatusComponent = (response: CheckStatusApiResponse | null) => {
    if (response !== null) {
      switch (response.status) {
        case StatusCode.FILE_BEING_PROCESSED:
          return <CheckStatusFileBeingProcessed />
        case StatusCode.PASSPORT_ISSUED_READY_FOR_PICKUP:
          return <CheckStatusReadyForPickup />
        case StatusCode.PASSPORT_IS_PRINTING:
          return (
            <CheckStatusPrinting
              response={response}
              backButtonHandler={handleOnGoBackClick}
            />
          )
        case StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST:
          return (
            <CheckStatusShippingCanadaPost
              trackingNumber={response.manifestNumber}
            />
          )
        case StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX:
          return (
            <CheckStatusShippingFedex
              trackingNumber={response.manifestNumber}
            />
          )
        case StatusCode.NOT_ACCEPTABLE_FOR_PROCESSING:
          return <CheckStatusNotAcceptable />
        default:
          return <CheckStatusNoRecord />
      }
    }

    return <CheckStatusNoRecord />
  }

  //if the api failed, fail hard to show error page
  if (checkStatusError) throw checkStatusError

  return (
    <Layout>
      <NextSeo
        title={getTitleHeader(checkStatusResponse)}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <IdleTimeout />
      {checkStatusResponse !== undefined ? (
        <div
          id={
            checkStatusResponse === null
              ? 'response-no-result'
              : 'response-result'
          }
        >
          {getStatusComponent(checkStatusResponse)}
        </div>
      ) : (
        <>
          <AlertBlock page="status" />
          <h1 id="main-header" className="h1" tabIndex={-1}>
            {t('header')}
          </h1>
          <form onSubmit={handleFormikSubmit} id="form-get-status" noValidate>
            <p>
              <Trans i18nKey="header-messages.required" ns="status" />
            </p>

            {errorSummaryItems.length > 0 && (
              <ErrorSummary
                id="error-summary-get-status"
                summary={t('common:found-errors', {
                  count: errorSummaryItems.length,
                })}
                errors={errorSummaryItems}
              />
            )}
            <div className="mt-8">
              <InputField
                id="esrf"
                name="esrf"
                label={t('esrf.label')}
                onChange={handleOnESRFChange}
                value={formikValues.esrf}
                errorMessage={formikErrors.esrf && t(formikErrors.esrf as any)}
                textRequired={t('common:required')}
                required
                helpMessage={
                  <Trans
                    i18nKey="esrf.help-message"
                    ns="status"
                    components={{
                      Link: <Link href="/email" />,
                    }}
                  />
                }
              />
            </div>
            <div className="mt-8">
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
                helpMessage={
                  <Trans i18nKey="given-name.help-message" ns="status" />
                }
                extraContent={
                  <Collapse title={t('given-name.title')} variant="slim">
                    <p className="border-l-[6px] border-gray-400 pl-6 text-base text-gray-600">
                      <Trans i18nKey="one-name" ns="status" />
                    </p>
                  </Collapse>
                }
              />
            </div>
            <div className="mt-8">
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
                helpMessage={
                  <Trans i18nKey="surname.help-message" ns="status" />
                }
              />
            </div>
            <div className="mt-8">
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
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <ActionButton
                id="btn-submit"
                disabled={isCheckStatusPending}
                type="submit"
                text={t('check-status')}
                style="primary"
              />
              <ActionButton
                id="btn-back"
                disabled={isCheckStatusPending}
                text={t('common:modal-go-back.back-button')}
                onClick={handleOnBackClick}
              />
            </div>
          </form>
        </>
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
    ...(await pageWithServerSideTranslations(locale, 'status')),
  },
})

export default Status
