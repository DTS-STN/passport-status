import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import AlertSection from '../AlertSection'
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
      <h2 data-testid="shipped-canada-post" className="h2">
        {t('shipped-canada-post.header')}
      </h2>
      <p>
        {t('shipped-canada-post.mailing')}
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
                href={t('status-check-tracking.link.canada-post', {
                  trackingNumber,
                })}
              >
                {t('status-check-tracking.can-track')}
              </ExternalLink>
            </p>
          </>
        )}
      </p>
      <p className="mt-6">{t('shipped-canada-post.supporting-documents')}</p>
      <p className="mt-6">
        <Trans
          i18nKey="status-check-call"
          ns="status"
          tOptions={{ phoneNumber: t('common:phone-number') }}
        />
      </p>
      <AlertSection type="warning">
        <h3 className="h3 mb-4">{t('wild-fires.header')}</h3>
        <p>
          <Trans
            i18nKey={'wild-fires.no-access'}
            ns="status"
            components={{
              Link: <ExternalLink href={t('wild-fires.contact-us-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            i18nKey={'wild-fires.learn-more'}
            ns="status"
            components={{
              Link: <ExternalLink href={t('wild-fires.learn-more-link')} />,
            }}
          />
        </p>
      </AlertSection>
    </>
  )
}

export default CheckStatusShippingCanadaPost
