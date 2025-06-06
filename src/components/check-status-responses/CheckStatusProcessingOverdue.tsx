import { Trans, useTranslation } from 'next-i18next'

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types'
import { formatDateShort } from '../../lib/utils/dates'
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

  const formattedDate = formatDateShort(receivedDate, i18n.language)

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

      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('status:being-processed-overdue.employee-reviewing')}</p>
          <p>{t('status:being-processed-overdue.processing-delayed')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 className="h2 mt-8 mb-2">
            {t('status:being-processed-overdue.service-standards.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={
                deliveryMethod === DeliveryMethodCode.MAIL
                  ? 'being-processed-overdue.service-standards.received-date-mail'
                  : 'being-processed-overdue.service-standards.received-date'
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
          <h2 className="h2 mt-8 mb-2">
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
          <div className="hidden w-full md:flex">
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
