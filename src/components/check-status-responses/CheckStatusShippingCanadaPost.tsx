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
      <AlertBlock page="status-shipped-canada" />
      <h1
        id="main-header"
        data-testid="printed-and-mailed"
        className="h1"
        tabIndex={-1}
      >
        {t('shipped-canada-post.header')}
      </h1>
      <p>{t('shipped-canada-post.header')}.</p>
      <AlertSection className="mb-4" type="success">
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
      <h2 className="h3 mb-2 mt-6">
        {t('shipped-canada-post.supporting-documents')}
      </h2>
      <p>
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
