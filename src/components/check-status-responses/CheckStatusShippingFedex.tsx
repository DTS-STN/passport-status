import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import { StatusDisplayData } from '../../lib/types'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import Collapse from '../Collapse'
import ExternalLink from '../ExternalLink'
import Timeline from '../Timeline'

export interface CheckStatusShippingFedexProps {
  displayData: StatusDisplayData
  checkAnotherHandler: MouseEventHandler<HTMLButtonElement>
  trackingNumber?: string
}

export const CheckStatusShippingFedex = ({
  checkAnotherHandler,
  displayData,
  trackingNumber,
}: CheckStatusShippingFedexProps) => {
  const { t } = useTranslation(['status', 'common', 'timeline'])

  const { timelineExists, timelineData } = displayData

  return (
    <div id="response-result">
      <AlertBlock page="status-shipped-fedex" />
      <h1
        id="main-header"
        data-testid="shipped-fedex"
        className="h1"
        tabIndex={-1}
      >
        {t('shipped-fedex.header')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('shipped-fedex.printed-mailed')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 className="h2 mt-8">
            {t('shipped-fedex.shipping-information.header')}
          </h2>

          {trackingNumber ? (
            <>
              <Collapse
                title={t(
                  'shipped-fedex.shipping-information.country-canada.header',
                )}
                variant="fullWidth"
              >
                <p>
                  <Trans
                    i18nKey="shipped-fedex.shipping-information.country-canada.mailing"
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
                <p className="font-bold">
                  {t(
                    'shipped-fedex.shipping-information.country-canada.send-separately',
                  )}
                </p>
                <p>
                  <Trans
                    i18nKey="shipped-fedex.shipping-information.country-canada.dont-receive"
                    ns="status"
                    components={{
                      Link: <ExternalLink href={t('common:contact-us-link')} />,
                    }}
                  />
                </p>
              </Collapse>
              <Collapse
                title={t(
                  'shipped-fedex.shipping-information.country-us.header',
                )}
                variant="fullWidth"
              >
                <p>
                  <Trans
                    i18nKey="shipped-fedex.shipping-information.country-us.mailing"
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
                <p>
                  <Trans
                    i18nKey="shipped-fedex.shipping-information.dont-receive"
                    ns="status"
                    components={{
                      Link: <ExternalLink href={t('common:contact-us-link')} />,
                    }}
                  />
                </p>
              </Collapse>
            </>
          ) : (
            <>
              <p>
                {t(
                  'shipped-fedex.shipping-information.no-tracking-number.mailing',
                )}
              </p>
              <p>
                <Trans
                  i18nKey="shipped-fedex.shipping-information.dont-receive"
                  ns="status"
                  components={{
                    Link: <ExternalLink href={t('common:contact-us-link')} />,
                  }}
                />
              </p>
            </>
          )}
          <div className="mt-8">
            <ActionButton
              onClick={checkAnotherHandler}
              text={t('status:check-another')}
              style="primary"
            />
          </div>
        </div>
        {timelineExists && (
          <div className="hidden w-full md:flex">
            <div className="-mt-6">
              <Timeline entries={timelineData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckStatusShippingFedex
