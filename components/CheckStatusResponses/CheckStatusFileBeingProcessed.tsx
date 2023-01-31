import { FC } from 'react'
import { Trans, useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="being-processed" className="h2">
        {t('being-processed.received')}
      </h2>
      <p>
        <Trans i18nKey={'being-processed.we-will-contact'} ns="status" />
      </p>
      <ul className="mb-5 list-disc space-y-2 pl-10">
        <li>
          <Trans
            i18nKey={'status-check-contact.call-us'}
            ns="status"
            tOptions={{ phoneNumber: t('common:phone-number') }}
            components={{
              Link: (
                <ExternalLink
                  href={t('status-check-contact.service-standard-href')}
                />
              ),
            }}
          />
        </li>
        <li>
          <Trans
            i18nKey={'status-check-urgent.description'}
            ns="status"
            components={{
              Link: (
                <ExternalLink
                  href={t('status-check-urgent.express-services-href')}
                />
              ),
            }}
          />
        </li>
      </ul>
    </>
  )
}

export default CheckStatusFileBeingProcessed
