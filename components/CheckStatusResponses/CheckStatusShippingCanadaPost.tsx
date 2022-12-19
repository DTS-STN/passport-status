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
      <p data-testid="shipped-canada-post">
        {t('shipped-canada-post.printed-and-mailing')}
      </p>
      {trackingNumber && (
        <p>
          {t('status-check-tracking.number')} <b>{trackingNumber}</b>.{' '}
          <ExternalLink
            href={t('status-check-tracking.link.canada-post', {
              trackingNumber,
            })}
          >
            {t('status-check-tracking.link.text')}
          </ExternalLink>
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
