import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <AlertBlock page="status-processing" />
      <h1
        id="main-header"
        data-testid="being-processed"
        className="h1"
        tabIndex={-1}
      >
        {t('being-processed.received')}
      </h1>
      <p>
        <Trans
          i18nKey={'being-processed.received-will-not-change'}
          ns="status"
        />
      </p>
      <p>
        <Trans i18nKey={'being-processed.applied-in-person'} ns="status" />
      </p>
      <p>
        <Trans i18nKey={'being-processed.applied-by-mail'} ns="status" />
      </p>
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
      <h2 className="h2 mb-2 mt-8">{t('being-processed.need-faster')}</h2>
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
      <h2 className="h2 mb-2 mt-8">
        {t('being-processed.dont-meet-standards')}
      </h2>
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
