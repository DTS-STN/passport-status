import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import AlertSection from '../AlertSection'
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
      <h1 data-testid="shipped-fedex" className="h1">
        {t('shipped-fedex.header')}
      </h1>
      <AlertBlock page="status-shipped-fedex" />
      <AlertSection type="success">
        <h2 data-testid="shipped-fedex-mailing" className="h2 mt-0">
          {t('shipped-fedex.mailing')}
        </h2>
        {trackingNumber ? (
          <>
            <p>
              <Trans
                i18nKey="status-check-tracking.number"
                ns="status"
                tOptions={{ trackingNumber }}
              />
            </p>
            <p>
              <ExternalLink
                data-gc-analytics-exempt={true}
                href={t('status-check-tracking.link.fedex', {
                  trackingNumber: encodeURIComponent(trackingNumber),
                })}
              >
                {t('status-check-tracking.can-track')}
              </ExternalLink>
            </p>
          </>
        ) : (
          <p>{t('shipped-fedex.take-up-to')}</p>
        )}
      </AlertSection>
      <p className="h3 mt-6">{t('shipped-fedex.supporting-documents')}</p>
      <p className="mt-6">
        <Trans
          i18nKey="shipped-fedex.contact-us"
          ns="status"
          components={{
            Link: <ExternalLink href={t('common:contact-us-link')} />,
          }}
        />
      </p>
    </>
  )
}

export default CheckStatusShippingFedex
