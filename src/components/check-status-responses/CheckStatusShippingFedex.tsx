import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

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
      <AlertSection type="success">
        <h2 data-testid="shipped-fedex-mailing" className="h2">
          {t('shipped-fedex.mailing')}
        </h2>
        {trackingNumber && (
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
                href={t('status-check-tracking.link.fedex', {
                  trackingNumber,
                })}
              >
                {t('status-check-tracking.can-track')}
              </ExternalLink>
            </p>
          </>
        )}
      </AlertSection>
      <p className="mt-6">{t('shipped-fedex.supporting-documents')}</p>
      <p className="mt-6">
        <Trans
          i18nKey="shipped-fedex.contact-us"
          ns="status"
          components={{
            Link: <ExternalLink href={t('common.contact-us-link')} />,
          }}
        />
      </p>
    </>
  )
}

export default CheckStatusShippingFedex
