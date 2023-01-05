import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="being-processed" className="text-blue-light">
        <b>{t('being-processed.received')}</b>
      </p>
      <p>
        {t('being-processed.we-will-contact.segment-1')}{' '}
        <b>{t('being-processed.never')}</b>{' '}
        {t('being-processed.we-will-contact.segment-2')}
      </p>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>
          {t('status-check-call')} <b>{t('common:phone-number')}</b>
          {t('status-check-contact.description-being-processed')}
          <ExternalLink href={t('status-check-contact.service-standard.href')}>
            {t('status-check-contact.service-standard.text')}
          </ExternalLink>
        </li>
        <li>
          {t('status-check-urgent.description')}
          <ExternalLink href={t('status-check-urgent.express-services.href')}>
            {t('status-check-urgent.express-services.text')}
          </ExternalLink>
        </li>
      </ul>
    </>
  )
}

export default CheckStatusFileBeingProcessed
