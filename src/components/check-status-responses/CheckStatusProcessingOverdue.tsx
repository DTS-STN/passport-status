import { Trans, useTranslation } from 'next-i18next'

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types'
import { formatDate } from '../../lib/utils/dates'
import { StatusResultProps } from '../../pages/status'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export const CheckStatusProcessingOverdue = ({
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
      <AlertBlock page="status-processing-overdue" />
      <h1
        id="main-header"
        data-testid="processing-overdue"
        className="h1"
        tabIndex={-1}
      >
        {t('status:being-processed-overdue.header')}
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="max-w-prose">
          <p>{t('status:being-processed-overdue.reviewing-application')}</p>
          <p>{t('status:being-processed-overdue.employee-reviewing')}</p>
          <p>{t('status:being-processed-overdue.processing-delayed')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 className="h2 mb-2 mt-8">
            {t('status:being-processed-overdue.service-standards.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={
                'being-processed-overdue.service-standards.received-date'
              }
              ns="status"
              components={{
                Link: <ExternalLink href={t('common:service-standard-link')} />,
              }}
              values={{
                receivedDate: formattedDate,
                serviceLevel: serviceDays,
              }}
            />
          </p>
          {deliveryMethod === DeliveryMethodCode.IN_PERSON && (
            <p>
              {t(
                'status:being-processed-overdue.service-standards.urgent-service-note',
              )}
            </p>
          )}
          <p>
            <Trans
              i18nKey={
                'being-processed-overdue.service-standards.refund-eligibility'
              }
              ns="status"
              components={{
                Link: <ExternalLink href={t('common:refund-eligible-link')} />,
              }}
            />
          </p>

          <h2 className="h2 mb-2 mt-8">
            {t('status:being-processed-overdue.travelling-soon.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={'being-processed-overdue.travelling-soon.if-travelling'}
              ns="status"
              components={{
                Link: (
                  <ExternalLink
                    href={t('status:status-check-urgent.express-services-href')}
                  />
                ),
              }}
              values={{
                serviceLevel:
                  serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20',
              }}
            />
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
          <div className="hidden w-full justify-center md:flex">
            <div className="-mt-6">
              <Timeline entries={timelineData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckStatusProcessingOverdue
