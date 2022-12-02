import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <div data-testid="no-record" className="my-5">
        {t('no-record.cannot-give-status.description')}
        <ul className="ml-5 list-inside list-disc">
          <li>{t('no-record.cannot-give-status.list.item-1')}</li>
          <li>{t('no-record.cannot-give-status.list.item-2')}</li>
        </ul>
      </div>
      <div className="my-5">
        {t('no-record.available-after.description')}
        <ul className="ml-5 list-inside">
          <li>
            <span className="font-bold">&#10003; </span>
            {t('no-record.available-after.list.item-1')}
          </li>
          <li>
            <span className="font-bold">&#10003; </span>
            {t('no-record.available-after.list.item-2')}
          </li>
        </ul>
      </div>
      <p className="my-5">{t('no-record.double-check')}</p>
      <div className="my-5">
        {t('status-check-numerous-attempts.description')}
        <a href={t('status-check-numerous-attempts.service-standard.href')}>
          {t('status-check-numerous-attempts.service-standard.text')}
        </a>
        {t('status-check-numerous-attempts.can-call')}
        <b>{t('common:phone-number')}</b>.
      </div>
      <div className="my-5">
        {t('status-check-urgent.description')}
        <a href={t('status-check-urgent.express-services.href')}>
          {t('status-check-urgent.express-services.text')}
        </a>
      </div>
    </>
  )
}

export default CheckStatusNoRecord
