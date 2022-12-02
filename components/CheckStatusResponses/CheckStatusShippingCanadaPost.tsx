import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export interface CheckStatusShippingCanadaPostProps {
  trackingNumber?: string
}

export const CheckStatusShippingCanadaPost: FC<
  CheckStatusShippingCanadaPostProps
> = ({ trackingNumber }) => {
  const { t } = useTranslation(['status', 'common'])

  return (
    <>
      <p data-testid="shipped-canada-post" className="my-5">
        {t('shipped-canada-post.printed-and-mailing')}
      </p>
      <div className="my-5">
        {t('status-check-tracking.number')} <b>{trackingNumber}</b>.{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-default underline hover:text-link-selected focus:text-link-selected active:text-link-visited"
          href={
            t('status-check-tracking.link.canada-post') +
            `?referenceNumber=${trackingNumber}#/details/${trackingNumber}`
          }
        >
          {t('status-check-tracking.link.text')}
        </a>
      </div>
      <p className="my-5">{t('shipped-canada-post.supporting-documents')}</p>
      <div className="my-5">
        {t('shipped-canada-post.did-not-receive')}{' '}
        <b>{t('common:phone-number')}</b>
      </div>
    </>
  )
}

export default CheckStatusShippingCanadaPost
