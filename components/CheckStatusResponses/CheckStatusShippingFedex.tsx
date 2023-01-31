import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import ExternalLink from '../ExternalLink'

export interface CheckStatusShippingFedexProps {
  trackingNumber?: string
}

export const CheckStatusShippingFedex: FC<CheckStatusShippingFedexProps> = ({
  trackingNumber,
}) => {
  const { t } = useTranslation('status')
  return (
    <>
      <h2 data-testid="shipped-fedex" className="h2">
        {t('shipped-fedex.header')}
      </h2>
      <p>
        {t('shipped-fedex.mailing')}
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
          href={t('status-check-tracking.link.fedex', {
            trackingNumber,
          })}
        >
          {t('status-check-tracking.can-track')}
        </ExternalLink>
      </p>
      <p className="mt-6">{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
