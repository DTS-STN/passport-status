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
      <p data-testid="shipped-fedex" className="my-5">
        {t('shipped-fedex.printed-and-mailing')}
      </p>
      <div className="my-5">
        {t('status-check-tracking.number')} <b>{trackingNumber}</b>.{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-default underline hover:text-link-selected focus:text-link-selected active:text-link-visited"
          href={`${t('status-check-tracking.link.fedex')}${trackingNumber}`}
        >
          {t('status-check-tracking.link.text')}
        </a>
      </div>
      <p className="my-5">{t('shipped-fedex.supporting-documents')}</p>
    </>
  )
}

export default CheckStatusShippingFedex
