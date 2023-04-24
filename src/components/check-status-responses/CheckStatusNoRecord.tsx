import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import AlertSection from '../AlertSection'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="no-record" className="h2">
        {t('no-record.cannot-give-status.description')}
      </h2>
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
      <p>{t('no-record.double-check')}</p>
      <AlertSection type="info">
        <p>
          <b>{t('strike-notice.notice')}</b>
        </p>
        <p>{t('strike-notice.no-record.labour-disruption')}</p>
        <p>
          <Trans
            i18nKey={'strike-notice.no-record.more-info'}
            ns="status"
            components={{
              Link: (
                <ExternalLink
                  href={t('strike-notice.disruption-impact-link')}
                />
              ),
            }}
          />
        </p>
      </AlertSection>
    </>
  )
}

export default CheckStatusNoRecord
