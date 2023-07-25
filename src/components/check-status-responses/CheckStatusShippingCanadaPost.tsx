import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import AlertSection from '../AlertSection'
import ExternalLink from '../ExternalLink'

export interface CheckStatusShippingCanadaPostProps {
  trackingNumber?: string
}

export const CheckStatusShippingCanadaPost = ({
  trackingNumber,
}: CheckStatusShippingCanadaPostProps) => {
  const { t } = useTranslation(['status', 'common'])

  return (
    <>
      <h1 data-testid="printed-and-mailed" className="h1">
        {t('shipped-canada-post.header')}
      </h1>
      <AlertBlock page="status-shipped-canada" />
      <AlertSection type="success">
        <h2 data-testid="shipped-canada-post" className="h2 mt-0">
          {t('shipped-canada-post.mailing')}
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
              <Trans
                i18nKey={'status-check-tracking.can-track'}
                ns="status"
                components={{
                  Link: (
                    <ExternalLink
                      data-gc-analytics-exempt={true}
                      href={t('status-check-tracking.link.canada-post', {
                        trackingNumber: encodeURIComponent(trackingNumber),
                      })}
                    />
                  ),
                }}
              />
            </p>
          </>
        ) : (
          <>
            <p>{t('shipped-canada-post.take-up-to')}</p>
            <p>{t('shipped-canada-post.remote-area')}</p>
          </>
        )}
      </AlertSection>
      <p className="h3 mt-6">{t('shipped-canada-post.supporting-documents')}</p>
      <p className="mt-6">
        <Trans
          i18nKey="status-check-call"
          ns="status"
          components={{
            Link: <ExternalLink href={t('common:contact-us-link')} />,
          }}
        />
      </p>
    </>
  )
}

export default CheckStatusShippingCanadaPost
