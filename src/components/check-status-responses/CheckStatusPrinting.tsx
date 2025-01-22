import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import { CheckStatusApiResponse, TimelineEntryData } from '../../lib/types'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export type CheckStatusPrintingProps = {
  response: CheckStatusApiResponse
  backButtonHandler: MouseEventHandler<HTMLButtonElement>
}

const getTimelineData = (
  response: CheckStatusApiResponse,
): TimelineEntryData[] => {
  return [
    {
      step: 'Received',
      status: 'done',
      date: '2024-01-05',
    },
    {
      step: 'Processing',
      status: 'done',
      date: '2024-01-06',
    },
    {
      step: 'Printing',
      status: 'current',
      date: '2024-01-07',
    },
    {
      step: 'Shipped',
      status: 'future',
      date: '2024-01-08',
    },
    {
      step: 'Shipped',
      status: 'future',
      date: '2024-01-08',
    },
  ]
}

export const CheckStatusPrinting = (props: CheckStatusPrintingProps) => {
  const { t } = useTranslation(['status', 'timeline'])

  const { response, backButtonHandler } = props

  const timelineData = getTimelineData(response)

  return (
    <div id="response-result">
      <AlertBlock page="status-ready-pickup" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('status:printing.in-printing')}
      </h1>
      <div className="flex flex-col sm:flex-row">
        <div className="max-w-prose">
          <p>{t('status:printing.reviewed-printing')}</p>
          {timelineData && (
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
        {timelineData && (
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
