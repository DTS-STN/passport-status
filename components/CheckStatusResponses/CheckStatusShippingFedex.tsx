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
      <p data-testid="shipped-fedex" className="text-blue-light">
        <b>{t('status-check-passport-printed')}</b>
      </p>
      <span>{t('shipped-fedex.mailing')}</span>
      {trackingNumber && (
        <span>
          {t('status-check-tracking.number')} <b>{trackingNumber}</b>.
          <br />
          <ExternalLink
            href={t('status-check-tracking.link.fedex', { trackingNumber })}
          >
            {t('status-check-tracking.link.text')}
          </ExternalLink>
        </span>
      )}
      <p className="mt-6">{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
