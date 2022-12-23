import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export interface CheckStatusShippingFedexProps {
  trackingNumber?: string
}

export const CheckStatusShippingFedex: FC<CheckStatusShippingFedexProps> = ({
  trackingNumber,
}) => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="shipped-fedex">
        {t('shipped-fedex.printed-and-mailing')}
      </p>
      {trackingNumber && (
        <p>
          {t('status-check-tracking.number')} <b>{trackingNumber}</b>.{' '}
          <ExternalLink
            href={t('status-check-tracking.link.fedex', { trackingNumber })}
          >
            {t('status-check-tracking.link.text')}
          </ExternalLink>
        </p>
      )}
      <p>{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
