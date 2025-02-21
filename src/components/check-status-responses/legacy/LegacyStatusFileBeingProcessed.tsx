import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import ActionButton from '../../ActionButton'
import AlertBlock from '../../AlertBlock'
import ExternalLink from '../../ExternalLink'

export type LegacyProcessingProps = {
  checkAnotherHandler: MouseEventHandler<HTMLButtonElement>
}

export const LegacyCheckStatusFileBeingProcessed = ({
  checkAnotherHandler,
}: LegacyProcessingProps) => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <div id="response-result">
      <AlertBlock page="status-processing" />
      <h1
        id="main-header"
        data-testid="legacy-being-processed"
        className="h1"
        tabIndex={-1}
      >
        {t('legacy.being-processed.received')}
      </h1>
      <div className="max-w-prose">
        <p>{t('legacy.being-processed.received-will-not-change')}</p>
        <p>{t('legacy.being-processed.applied-in-person')}</p>
        <p>{t('legacy.being-processed.applied-by-mail')}</p>
        <p>{t('legacy.being-processed.we-will-contact')}</p>
        <p>
          <Trans
            i18nKey={'legacy.being-processed.ready-within'}
            ns="status"
            components={{
              Link: (
                <ExternalLink
                  href={t('status-check-contact.service-standard-href')}
                />
              ),
            }}
          />
        </p>
        <p>{t('legacy.being-processed.incomplete')}</p>
        <h2 className="h3 mb-2 mt-8">
          {t('legacy.being-processed.need-faster')}
        </h2>
        <p>
          <Trans
            i18nKey={'legacy.being-processed.get-urgent'}
            ns="status"
            components={{
              Link: (
                <ExternalLink
                  href={t('status-check-urgent.express-services-href')}
                />
              ),
            }}
          />
        </p>
        <h2 className="h3 mb-2 mt-8">
          {t('legacy.being-processed.dont-meet-standards')}
        </h2>
        <p>
          <Trans
            i18nKey={'legacy.being-processed.may-be-eligible'}
            ns="status"
            components={{
              Link: (
                <ExternalLink
                  href={t('status-check-contact.service-standard-href')}
                />
              ),
            }}
          />
        </p>
        <div className="mt-8">
          <ActionButton
            onClick={checkAnotherHandler}
            text={t('check-another')}
            style="primary"
          />
        </div>
      </div>
    </div>
  )
}

export default LegacyCheckStatusFileBeingProcessed
