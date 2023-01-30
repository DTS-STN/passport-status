import { FC } from 'react'
import { Trans, useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="no-record" className="h2">
        {t('no-record.cannot-give-status.description')}
      </h2>
      <p>{t('no-record.cannot-give-status.because')}</p>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>
          <Trans
            i18nKey={'no-record.cannot-give-status.list.item-1'}
            ns="status"
          />
        </li>
        <li>{t('no-record.cannot-give-status.list.item-2')}</li>
      </ul>
      <p>{t('no-record.double-check')}</p>
      <p>
        <Trans
          i18nKey={'no-record.contact-us'}
          ns="status"
          tOptions={{ phoneNumber: t('common:phone-number') }}
          components={{
            Link: <ExternalLink href={t('no-record.service-standard-link')} />,
          }}
        />
      </p>
      <p>
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
      </p>
    </>
  )
}

export default CheckStatusNoRecord
