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
      <AlertBlock page="status-shipped-fedex" />
      <h1
        id="main-header"
        data-testid="shipped-fedex"
        className="h1"
        tabIndex={-1}
      >
        {t('shipped-fedex.header')}
      </h1>
      <p>{t('shipped-fedex.header')}.</p>
      <div className="w-fit">
        <Collapse
          title={t('shipped-fedex.country-canada.header')}
          variant="fullWidth"
        >
          <AlertSection type="success">
            <h2 data-testid="shipped-purolator-mailing" className="h2 mt-0">
              {t('shipped-fedex.country-canada.mailing')}
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
                          href={t('status-check-tracking.link.purolator', {
                            trackingNumber: encodeURIComponent(trackingNumber),
                          })}
                        />
                      ),
                    }}
                  />
                </p>
              </>
            ) : (
              <p>{t('shipped-fedex.take-up-to')}</p>
            )}
          </AlertSection>
        </Collapse>
        <Collapse
          title={t('shipped-fedex.country-us.header')}
          variant="fullWidth"
        >
          <AlertSection type="success">
            <h2 data-testid="shipped-fedex-mailing" className="h2 mt-0">
              {t('shipped-fedex.country-us.mailing')}
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
                          href={t('status-check-tracking.link.fedex', {
                            trackingNumber: encodeURIComponent(trackingNumber),
                          })}
                        />
                      ),
                    }}
                  />
                </p>
              </>
            ) : (
              <p>{t('shipped-fedex.take-up-to')}</p>
            )}
          </AlertSection>
        </Collapse>
      </div>
      <p className="mb-2 mt-6">
        <strong>{t('shipped-fedex.supporting-documents')}</strong>
      </p>
    </>
  )
}

export default CheckStatusShippingFedex
