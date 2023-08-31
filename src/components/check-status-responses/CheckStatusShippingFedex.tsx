import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import AlertSection from '../AlertSection'
import Collapse from '../Collapse'
import ExternalLink from '../ExternalLink'

export interface CheckStatusShippingFedexProps {
  trackingNumber?: string
}

export const CheckStatusShippingFedex = ({
  trackingNumber,
}: CheckStatusShippingFedexProps) => {
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
            <Collapse title={t('shipped-fedex.bermuda.title')}>
              <p>{t('shipped-fedex.bermuda.applied-from')}</p>
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
                        href={t('status-check-tracking.link.fedex', {
                          trackingNumber: encodeURIComponent(trackingNumber),
                        })}
                      />
                    ),
                  }}
                />
              </p>
            </Collapse>
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
