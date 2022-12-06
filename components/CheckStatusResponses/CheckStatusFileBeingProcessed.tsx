import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusFileBeingProcessed: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="being-processed">{t('being-processed.received')}</p>
      <p>{t('being-processed.we-will-contact')}</p>
      <p>
        {t('status-check-numerous-attempts.description')}
        <a href={t('status-check-numerous-attempts.service-standard.href')}>
          {t('status-check-numerous-attempts.service-standard.text')}
        </a>
        {t('status-check-numerous-attempts.can-call')}
        <b>{t('common:phone-number')}</b>.
      </p>
      <p>
        {t('status-check-urgent.description')}
        <a href={t('status-check-urgent.express-services.href')}>
          {t('status-check-urgent.express-services.text')}
        </a>
      </p>
    </>
  )
}

export default CheckStatusFileBeingProcessed
