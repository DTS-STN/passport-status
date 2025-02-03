import { Trans, useTranslation } from 'next-i18next'

import { ServiceLevelCode } from '../../lib/types'
import { formatDate } from '../../lib/utils/dates'
import { StatusResultProps } from '../../pages/status'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export const CheckStatusPrinting = (props: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'timeline'])

  const { displayData, backButtonHandler } = props

  const { receivedDate, serviceLevel, timelineExists, timelineData } =
    displayData

  const serviceDays = serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20'

  const formattedDate = formatDate(receivedDate, i18n.language)

  return (
    <div id="response-result">
      <AlertBlock page="status-ready-pickup" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('status:printing.in-printing')}
      </h1>
      <div className="flex flex-col sm:flex-row">
        <div className="max-w-prose">
          <p>{t('status:printing.reviewed-printing')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center sm:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2
            id="service-standards-header"
            data-testid="service-standards"
            className="h2"
          >
            {t('status:printing.service-standards.header')}
          </h2>
          <p>
            <Trans
              i18nKey="printing.service-standards.we-received"
              ns="status"
              tOptions={{ formattedDate, serviceDays }}
              components={{
                Link: (
                  <ExternalLink
                    href={t(
                      'status:status-check-contact.service-standard-href',
                    )}
                  />
                ),
              }}
            />
          </p>
          <p>{t('status:printing.service-standards.dont-meet')}</p>
          <div className="mt-8">
            <ActionButton
              onClick={backButtonHandler}
              text={t('status:previous')}
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

export default CheckStatusPrinting
