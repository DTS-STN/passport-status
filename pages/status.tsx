import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import { useFormik, validateYupSchema, yupToFormErrors } from 'formik'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import ActionButton from '../components/ActionButton'
import CheckStatusInfo from '../components/CheckStatusInfo'
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
import { CheckStatusApiRequestQuery } from '../lib/types'
import { useCheckStatus } from '../lib/useCheckStatus'

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
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToHeading = useCallback(() => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    headingRef.current?.focus()
  }, [headingRef])

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
      onSuccess: () => scrollToHeading(),
    }
  )

  const errorSummaryItems = useMemo<ErrorSummaryItem[]>(
    () =>
      getErrorSummaryItems(formikErrors, t).map((item) => {
        if (item.feildId !== 'dateOfBirth') return item
        // field id should target the year select input
        return { ...item, feildId: 'dateOfBirth-year' }
      }),
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
      scrollToHeading()
    },
    [
      checkStatusResponse,
      setFormikStatus,
      removeCheckStatusResponse,
      scrollToHeading,
      router,
    ]
  )

  const handleOnESRFChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setFormikFieldValue(target.name, target.value.replace(/[^a-z0-9]/gi, ''))
    },
    [setFormikFieldValue]
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
  if (checkStatusError) throw checkStatusError

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <IdleTimeout />
      <h1 ref={headingRef} className="h1" tabIndex={-1}>
        {t('header')}
      </h1>
      {checkStatusResponse !== undefined ? (
        <CheckStatusInfo
          id={
            checkStatusResponse === null
              ? 'response-no-result'
              : 'response-result'
          }
          onGoBackClick={handleOnGoBackClick}
          goBackText={checkStatusResponse === null ? t('previous') : t('reset')}
          goBackStyle="primary"
          checkStatusResponse={checkStatusResponse}
        />
      ) : (
        <form onSubmit={handleFormikSubmit} id="form-get-status">
          <p>
            <Trans i18nKey="header-messages.matches" ns="status" />
          </p>
          <ul className="mb-5 list-disc space-y-2 pl-10">
            <li>{t('header-messages.list.item-1')}</li>
            <li>{t('header-messages.list.item-2')}</li>
            <li>
              <Trans i18nKey="header-messages.list.item-3" ns="status" />
            </li>
            <li>{t('header-messages.list.item-4')}</li>
          </ul>
          <div className="mb-5 rounded border border-gray-300 bg-gray-100 p-5">
            <p className="m-0">
              <Trans
                i18nKey="header-messages.for-child-application"
                ns="status"
              />
            </p>
          </div>

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
            helpMessage={
              <p>
                <Trans
                  i18nKey="esrf.help"
                  ns="status"
                  components={{
                    Link: <Link href="/email" />,
                  }}
                />
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
          <div className="mt-8 flex flex-wrap gap-2">
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
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'status',
    ])),
  },
})

export default Status
