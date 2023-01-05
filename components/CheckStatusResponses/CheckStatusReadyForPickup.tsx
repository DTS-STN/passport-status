import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusReadyForPickup: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="ready-for-pickup" className="text-blue-light">
        <b>{t('status-check-passport-printed')}</b>
      </p>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>{t('ready-for-pickup.check-receipt')}</li>
        <li>{t('ready-for-pickup.do-not-visit')}</li>
      </ul>
    </>
  )
}

export default CheckStatusReadyForPickup
