import { Trans, useTranslation } from 'next-i18next'

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types'
import { formatDateShort } from '../../lib/utils/dates'
import { StatusResultProps } from '../../pages/status'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export const CheckStatusPrinting = ({
  displayData,
  checkAnotherHandler,
}: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'timeline'])

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
      <AlertBlock page="status-printing" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('printing.in-printing')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('printing.reviewed-printing')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2
            id="service-standards-header"
            data-testid="service-standards"
            className="h2"
          >
            {t('printing.service-standards.header')}
          </h2>
          <p>
            <Trans
              i18nKey={
                deliveryMethod === DeliveryMethodCode.MAIL
                  ? 'printing.service-standards.we-received-mail'
                  : 'printing.service-standards.we-received'
              }
              ns="status"
              values={{
                receivedDate: formattedDate,
                serviceLevel: serviceDays,
              }}
              components={{
                Link: (
                  <ExternalLink
                    href={t('status-check-contact.service-standard-href')}
                  />
                ),
              }}
            />
          </p>
          {serviceLevel === ServiceLevelCode.TEN_DAYS && (
            <p>{t('printing.service-standards.requested-urgent')}</p>
          )}
          <div className="mt-8">
            <ActionButton
              onClick={checkAnotherHandler}
              text={t('check-another')}
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

export default CheckStatusPrinting
