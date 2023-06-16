import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h1 data-testid="no-record" className="h1">
        {t('no-record.cannot-give-status.description')}
      </h1>
      <AlertBlock page="status-not-found" position="top" />
      <p>{t('no-record.cannot-give-status.because')}</p>
      <ul className="mb-5 list-disc space-y-2 pl-10">
        <li>
          <Trans
            i18nKey={'no-record.cannot-give-status.list.item-1'}
            ns="status"
          />
        </li>
        <li>{t('no-record.cannot-give-status.list.item-2')}</li>
      </ul>
      <p>{t('no-record.can-review')}</p>
      <p>
        <Trans
          i18nKey={'no-record.contact-us'}
          ns="status"
          components={{
            Link: (
              <ExternalLink
                href={t('status-check-contact.service-standard-href')}
              />
            ),
            Link2: <ExternalLink href={t('common:contact-us-link')} />,
          }}
        />
      </p>
      <p className="h3">{t('no-record.need-faster')}</p>
      <p>
        <Trans
          i18nKey={'no-record.get-urgent'}
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
      <AlertBlock page="status-not-found" position="bottom" />
    </>
  )
}

export default CheckStatusNoRecord
