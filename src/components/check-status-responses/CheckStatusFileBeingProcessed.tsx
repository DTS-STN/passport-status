import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import { TimelineEntryData } from '../../lib/types'
import { formatDate } from '../../lib/utils/dates'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export type CheckStatusProcessingProps = {
  serviceLevel: '10' | '20'
  timelineData: TimelineEntryData[]
  backButtonHandler: MouseEventHandler<HTMLButtonElement>
}

export const CheckStatusFileBeingProcessed = (
  props: CheckStatusProcessingProps,
) => {
  const { t, i18n } = useTranslation(['status', 'common'])
  const { serviceLevel, timelineData, backButtonHandler } = props
  const receivedDate = formatDate(
    timelineData[0].date ?? '1900-01-01',
    i18n.language,
  )

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
            <Trans i18nKey={'being-processed.processing-details'} ns="status" />
          </p>
          <p>
            <Trans i18nKey={'being-processed.completion-status'} ns="status" />
          </p>
          <p>
            <Trans
              i18nKey={'being-processed.urgent-service-note'}
              ns="status"
            />
          </p>
          {timelineData.length > 0 && (
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
                receivedDate: receivedDate,
                serviceLevel: serviceLevel,
              }}
            />
          </p>
          <p>
            <Trans
              i18nKey={'being-processed.service-standards.refund-eligibility'}
              ns="status"
            />
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
              values={{ serviceLevel: serviceLevel }}
            />
          </p>
          <h2 className="h2 mb-2 mt-8">
            {t('being-processed.incomplete-applications.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={'being-processed.incomplete-applications.description'}
              ns="status"
            />
          </p>
          <p>
            <Trans
              i18nKey={'being-processed.incomplete-applications.return-notice'}
              ns="status"
            />
          </p>
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

export default CheckStatusFileBeingProcessed
