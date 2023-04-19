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
      <h1 data-testid="printed-and-mailed" className="h1">
        {t('shipped-canada-post.header')}
      </h1>
      <h2 data-testid="shipped-canada-post" className="h2">
        {t('shipped-canada-post.mailing')}
      </h2>
      <AlertSection type="success">
        <p>
          {trackingNumber && (
            <>
              {' '}
              <Trans
                i18nKey="status-check-tracking.number"
                ns="status"
                tOptions={{ trackingNumber }}
              />
            </>
          )}
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
      </AlertSection>
      <h3 className="h3 mt-6">
        {t('shipped-canada-post.supporting-documents')}
      </h3>
      <p>
        <Trans
          i18nKey="status-check-call"
          ns="status"
          components={{
            Link: <ExternalLink href={t('common.contact-us-link')} />,
          }}
        />
      </p>
    </>
  )
}

export default CheckStatusShippingCanadaPost
