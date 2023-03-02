import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import ExternalLink from '../ExternalLink'

export interface CheckStatusShippingCanadaPostProps {
  trackingNumber?: string
}

export const CheckStatusShippingCanadaPost: FC<
  CheckStatusShippingCanadaPostProps
> = ({ trackingNumber }) => {
  const { t } = useTranslation(['status', 'common'])

  return (
    <>
      <h2 data-testid="shipped-canada-post" className="h2">
        {t('shipped-canada-post.header')}
      </h2>
      <p>
        {t('shipped-canada-post.mailing')}
        {trackingNumber && (
          <>
            {' '}
            <Trans
              i18nKey="status-check-tracking.number"
              ns="status"
              tOptions={{ trackingNumber }}
            />
          </>
        )}
      </p>
      <p>
        <ExternalLink
          href={t('status-check-tracking.link.canada-post', {
            trackingNumber,
          })}
        >
          {t('status-check-tracking.can-track')}
        </ExternalLink>
      </p>
      <p className="mt-6">{t('shipped-canada-post.supporting-documents')}</p>
      <p>
        <Trans
          i18nKey="status-check-call"
          ns="status"
          tOptions={{ phoneNumber: t('common:phone-number') }}
        />
      </p>
    </>
  )
}

export default CheckStatusShippingCanadaPost
