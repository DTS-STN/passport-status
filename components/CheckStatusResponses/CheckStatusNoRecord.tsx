import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="no-record">
        {t('no-record.cannot-give-status.description')}
      </p>
      <ul className="list-disc space-y-2 pl-10 mb-3">
        <li>{t('no-record.cannot-give-status.list.item-1')}</li>
        <li>{t('no-record.cannot-give-status.list.item-2')}</li>
      </ul>
      <p>{t('no-record.available-after.description')}</p>
      <ul className="space-y-2 pl-4 mb-3">
        <IconListItem
          icon="check-mark"
          text={t('no-record.available-after.list.item-1')}
        />
        <IconListItem
          icon="check-mark"
          text={t('no-record.available-after.list.item-2')}
        />
      </ul>
      <p>{t('no-record.double-check')}</p>
      <p>
        {t('status-check-contact.description-no-record')}
        <ExternalLink href={t('status-check-contact.service-standard.href')}>
          {t('status-check-contact.service-standard.text')}
        </ExternalLink>
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

interface IconListItemProps {
  icon: 'check-mark' | 'cross'
  text: string
}

const IconListItem: FC<IconListItemProps> = ({ icon, text }) => {
  return (
    <li className="flex flex-nowrap gap-2">
      <div className="font-bold">
        {icon === 'check-mark' ? <>&#10003;</> : <>&#10007;</>}
      </div>
      <div>{text}</div>
    </li>
  )
}

export default CheckStatusNoRecord
