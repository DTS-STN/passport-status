import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import { StatusDisplayData } from '../../lib/types'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export interface CheckStatusShippingCanadaPostProps {
  displayData: StatusDisplayData
  checkAnotherHandler: MouseEventHandler<HTMLButtonElement>
  trackingNumber?: string
}

export const CheckStatusShippingCanadaPost = ({
  displayData,
  checkAnotherHandler,
  trackingNumber,
}: CheckStatusShippingCanadaPostProps) => {
  const { t } = useTranslation(['status', 'common', 'timeline'])

  const { timelineExists, timelineData } = displayData

  return (
    <div id="response-result">
      <AlertBlock page="status-shipped-canada" />
      <h1
        id="main-header"
        data-testid="shipped-canada-post"
        className="h1"
        tabIndex={-1}
      >
        {t('shipped-canada-post.header')}
      </h1>
      <div className="flex flex-col sm:flex-row">
        <div className="max-w-prose">
          <p>{t('shipped-canada-post.printed-mailed')}.</p>
          {timelineExists && (
            <div className="flex w-full justify-center sm:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 data-testid="shipped-canada-post-mailing" className="h2 mt-0">
            {t('shipped-canada-post.shipping-information.header')}
          </h2>
          <p>
            `${t('shipped-canada-post.shipping-information.sending-via')} $
            {trackingNumber ? (
              <Trans
                i18nKey="status-check-tracking.number"
                ns="status"
                tOptions={{ trackingNumber }}
              />
            ) : (
              t('shipped-canada-post.shipping-information.take-up-to')
            )}
            `
          </p>
          {!trackingNumber && (
            <p>
              {t('shipped-canada-post.shipping-information.northern-remote')}
            </p>
          )}
          {trackingNumber && (
            <>
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
          )}
          <p className="mb-2 mt-6">
            <strong>
              {t(
                'shipped-canada-post.shipping-information.supporting-documents',
              )}
            </strong>
          </p>
          <p>
            <Trans
              i18nKey="shipped-canada-post.shipping-information.dont-receive"
              ns="status"
              components={{
                Link: <ExternalLink href={t('common:contact-us-link')} />,
              }}
            />
          </p>
          <div className="mt-8">
            <ActionButton
              onClick={checkAnotherHandler}
              text={t('status:check-another')}
              style="primary"
            />
          </div>
        </div>
        {timelineExists && (
          <div className="hidden w-full justify-center sm:flex">
            <div className="-mt-6">
              <Timeline entries={timelineData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckStatusShippingCanadaPost
