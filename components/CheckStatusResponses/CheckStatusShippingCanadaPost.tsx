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
      <p data-testid="shipped-canada-post">
        {t('shipped-canada-post.printed-and-mailing')}
      </p>
      {trackingNumber && (
        <p>
          {t('status-check-tracking.number')} <b>{trackingNumber}</b>.{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-default underline hover:text-link-selected focus:text-link-selected active:text-link-visited"
            href={t('status-check-tracking.link.canada-post', {
              trackingNumber,
            })}
          >
            {t('status-check-tracking.link.text')}
          </a>
        </p>
      )}
      <p>{t('shipped-canada-post.supporting-documents')}</p>
      <p>
        {t('shipped-canada-post.did-not-receive')}{' '}
        <b>{t('common:phone-number')}</b>
      </p>
    </>
  )
}

export default CheckStatusShippingCanadaPost
