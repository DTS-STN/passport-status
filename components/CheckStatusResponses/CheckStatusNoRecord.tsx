import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="no-record" className="text-blue-light">
        <b>{t('no-record.cannot-give-status.description')}</b>
      </p>
      <p>{t('no-record.cannot-give-status.because')}</p>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>
          {t('no-record.cannot-give-status.list.item-1')}{' '}
          <b>{t('common:or')}</b>
        </li>
        <li>{t('no-record.cannot-give-status.list.item-2')}</li>
      </ul>
      <p>{t('no-record.double-check')}</p>
      <p>
        {t('status-check-call')} <b>{t('common:phone-number')}</b>{' '}
        {t('no-record.if')}
      </p>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>
          {t('status-check-contact.description-no-record.item-1')}{' '}
          <b>{t('common:or')}</b>
        </li>
        <li>
          {t('status-check-contact.description-no-record.item-2')}{' '}
          <ExternalLink href={t('status-check-contact.service-standard.href')}>
            {t('status-check-contact.service-standard.text')}
          </ExternalLink>
        </li>
      </ul>
      <p>
        {t('status-check-urgent.description')}
        <ExternalLink href={t('status-check-urgent.express-services.href')}>
          {t('status-check-urgent.express-services.text')}
        </ExternalLink>
      </p>
    </>
  )
}

export default CheckStatusNoRecord
