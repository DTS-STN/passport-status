import { FC } from 'react'
import { useTranslation } from 'next-i18next'

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
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-default underline hover:text-link-selected focus:text-link-selected active:text-link-visited"
            href={t('status-check-tracking.link.fedex', { trackingNumber })}
          >
            {t('status-check-tracking.link.text')}
          </a>
        </p>
      )}
      <p>{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
