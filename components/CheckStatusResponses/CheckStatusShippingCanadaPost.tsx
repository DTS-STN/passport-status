import { FC } from 'react'
import { useTranslation } from 'next-i18next'
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
      <h2 data-testid="shipped-canada-post" className="h2 text-blue-normal">
        {t('status-check-passport-printed')}
      </h2>
      <span>{t('shipped-canada-post.mailing')}</span>
      {trackingNumber && (
        <span className="whitespace-pre-line">
          {t('status-check-tracking.number')} <b>{trackingNumber}</b>.
          <ExternalLink
            href={t('status-check-tracking.link.canada-post', {
              trackingNumber,
            })}
          >
            {t('status-check-tracking.link.text')}
          </ExternalLink>
        </span>
      )}
      <p className="mt-6 text-blue-light">
        {t('shipped-canada-post.supporting-documents')}
      </p>
      <p>
        {t('status-check-call')} <b>{t('common:phone-number')}</b>{' '}
        {t('shipped-canada-post.did-not-receive')}
      </p>
    </>
  )
}

export default CheckStatusShippingCanadaPost
