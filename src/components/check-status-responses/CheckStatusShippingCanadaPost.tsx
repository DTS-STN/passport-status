import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import AlertSection from '../AlertSection'
import Collapse from '../Collapse'
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
      <h1 data-testid="printed-and-mailed" className="h1" tabIndex={-1}>
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
      <Collapse title={t('shipped-canada-post.united-states.title')}>
        <div className="mt-3 border-t">
          <p className="mt-3">
            {t('shipped-canada-post.united-states.mailed-us')}
          </p>
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
            <></>
          )}
          <p>
            <strong>
              {t('shipped-canada-post.united-states.supporting-documents')}
            </strong>
          </p>
          <p>
            <Trans
              i18nKey="shipped-canada-post.united-states.contact-us"
              ns="status"
              components={{
                Link: <ExternalLink href={t('common:contact-us-link')} />,
              }}
            />
          </p>
        </div>
      </Collapse>
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
