import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import AlertSection from '../AlertSection'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="being-processed" className="h2">
        {t('being-processed.received')}
      </h2>
      <p>
        <Trans i18nKey={'being-processed.we-will-contact'} ns="status" />
      </p>
      <AlertSection type="info">
        <p>
          <b>{t('strike-notice.notice')}</b>
        </p>
        <p>{t('strike-notice.being-processed.labour-disruption')}</p>
        <p>{t('strike-notice.being-processed.do-not-meet-criteria')}</p>
        <p>{t('strike-notice.being-processed.criteria.defined-as')}</p>
        <ul className="mb-5 list-disc space-y-2 pl-10">
          <li>{t('strike-notice.being-processed.criteria.list.item-1')}</li>
          <li>{t('strike-notice.being-processed.criteria.list.item-2')}</li>
          <li>{t('strike-notice.being-processed.criteria.list.item-3')}</li>
          <li>{t('strike-notice.being-processed.criteria.list.item-4')}</li>
        </ul>
        <p>
          <Trans
            i18nKey={'strike-notice.being-processed.meet-criteria'}
            ns="status"
          />
        </p>
        <p>
          <Trans
            i18nKey={'strike-notice.being-processed.more-info'}
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

export default CheckStatusFileBeingProcessed
