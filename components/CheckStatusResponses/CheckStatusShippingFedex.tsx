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
      <h2 data-testid="shipped-fedex" className="h2 text-blue-normal">
        {t('status-check-passport-printed')}
      </h2>
      <p>
        {t('shipped-fedex.mailing')}
        {trackingNumber && (
          <>
            {t('status-check-tracking.number')} <b>{trackingNumber}</b>.<br />
            <ExternalLink
              href={t('status-check-tracking.link.fedex', { trackingNumber })}
            >
              {t('status-check-tracking.link.text')}
            </ExternalLink>
          </>
        )}
      </p>
      <p className="mt-6">{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
