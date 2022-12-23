import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusFileBeingProcessed: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="being-processed">{t('being-processed.received')}</p>
      <p>{t('being-processed.we-will-contact')}</p>
      <p className="mt-6 text-blue-light">{t('being-processed.more-info')}</p>
      <p>
        {t('status-check-contact.description-being-processed.segment-1')}
        <ExternalLink href={t('status-check-contact.service-standard.href')}>
          {t('status-check-contact.service-standard.text')}
        </ExternalLink>
        {t('status-check-contact.description-being-processed.segment-2')}
        {t('status-check-contact.can-call')}
        <b>{t('common:phone-number')}</b>.
      </p>
      <p>
        {t('status-check-urgent.description')}
        <ExternalLink href={t('status-check-urgent.express-services.href')}>
          {t('status-check-urgent.express-services.text')}
        </ExternalLink>
      </p>
    </>
  )
}

export default CheckStatusFileBeingProcessed
