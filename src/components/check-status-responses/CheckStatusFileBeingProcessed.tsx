import { Trans, useTranslation } from 'next-i18next'

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types'
import { formatDate } from '../../lib/utils/dates'
import { StatusResultProps } from '../../pages/status'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export const CheckStatusFileBeingProcessed = ({
  displayData,
  checkAnotherHandler,
}: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'common'])

  const {
    deliveryMethod,
    receivedDate,
    serviceLevel,
    timelineExists,
    timelineData,
  } = displayData

  const serviceDays = serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20'

  const formattedDate = formatDate(receivedDate, i18n.language)

  return (
    <div id="response-result">
      <AlertBlock page="status-processing" />
      <h1
        id="main-header"
        data-testid="being-processed"
        className="h1"
        tabIndex={-1}
      >
        {t('being-processed.reviewing-application')}
      </h1>
      <div className="flex flex-col sm:flex-row">
        <div className="max-w-prose">
          <p>
            <Trans
              i18nKey={'being-processed.processing-details'}
              ns="status"
              values={{
                reviewDays:
                  serviceLevel === ServiceLevelCode.TEN_DAYS ? '7' : '15',
                printDays:
                  serviceLevel === ServiceLevelCode.TEN_DAYS ? '3' : '5',
              }}
            />
          </p>
          <p>
            <Trans
              i18nKey={'being-processed.completion-status'}
              ns="status"
              values={{
                serviceLevel: serviceDays,
              }}
            />
          </p>
          {deliveryMethod === DeliveryMethodCode.IN_PERSON && (
            <p>{t('status:being-processed.urgent-service-note')}</p>
          )}
          {timelineExists && (
            <div className="flex w-full justify-center sm:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 className="h2 mb-2 mt-8">
            {t('being-processed.service-standards.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={'being-processed.service-standards.received-date'}
              ns="status"
              values={{
                receivedDate: formattedDate,
                serviceLevel: serviceDays,
              }}
            />
          </p>
          <p>
            {t('status:being-processed.service-standards.refund-eligibility')}
          </p>
          <h2 className="h2 mb-2 mt-8">
            {t('being-processed.expedited-service.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={'being-processed.expedited-service.details'}
              ns="status"
              components={{
                Link: (
                  <ExternalLink
                    href={t('status-check-urgent.express-services-href')}
                  />
                ),
              }}
              values={{ serviceLevel: serviceDays }}
            />
          </p>
          <h2 className="h2 mb-2 mt-8">
            {t('status:being-processed.incomplete-applications.heading')}
          </h2>
          <p>
            {t('status:being-processed.incomplete-applications.description')}
          </p>
          <p>
            {t('status:being-processed.incomplete-applications.return-notice')}
          </p>
          <div className="mt-8">
            <ActionButton
              onClick={checkAnotherHandler}
              text={t('status:check-another')}
              style="primary"
            />
          </div>
        </div>
        {timelineExists && (
          <div className="hidden w-full justify-center sm:flex">
            <div className="-mt-6">
              <Timeline entries={timelineData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckStatusFileBeingProcessed
