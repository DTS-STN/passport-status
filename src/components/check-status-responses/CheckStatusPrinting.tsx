import { Trans, useTranslation } from 'next-i18next'

import { TimelineEntryData } from '../../lib/types'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export const CheckStatusPrinting = () => {
  const { t } = useTranslation(['status', 'timeline'])
  const timelineData: TimelineEntryData[] = [
    {
      step: 'Received',
      status: 'done',
      date: '2024-01-5',
    },
    {
      step: 'Processing',
      status: 'done',
      date: '2024-01-6',
    },
    {
      step: 'Printing',
      status: 'current',
      date: '2024-01-7',
    },
    {
      step: 'Shipped',
      status: 'future',
      date: '2024-01-8',
    },
    {
      step: 'Shipped',
      status: 'future',
      date: '2024-01-8',
    },
    {
      step: 'Shipped',
      status: 'future',
      date: '2024-01-8',
    },
  ]
  return (
    <>
      <AlertBlock page="status-ready-pickup" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('status:printing.in-printing')}
      </h1>
      <div className="flex">
        <div className="max-w-prose">
          <p>{t('status:printing.reviewed-printing')}</p>
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
        </div>
        <div className="-mt-10 ml-12">
          <Timeline entries={timelineData} />
        </div>
      </div>
    </>
  )
}

export default CheckStatusPrinting
