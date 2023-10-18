import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h1 data-testid="being-processed" className="h1" tabIndex={-1}>
        {t('being-processed.received')}
      </h1>
      <AlertBlock page="status-processing" />
      <p>
        <Trans i18nKey={'being-processed.we-will-contact'} ns="status" />
      </p>
      <p>
        <Trans
          i18nKey={'being-processed.ready-within'}
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
      <p>{t('being-processed.incomplete')}</p>
      <p className="h3">{t('being-processed.need-faster')}</p>
      <p>
        <Trans
          i18nKey={'being-processed.get-urgent'}
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
      <p className="h3">{t('being-processed.dont-meet-standards')}</p>
      <p>
        <Trans
          i18nKey={'being-processed.may-be-eligible'}
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
    </>
  )
}

export default CheckStatusFileBeingProcessed
