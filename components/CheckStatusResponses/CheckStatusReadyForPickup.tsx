import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusReadyForPickup: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="ready-for-pickup" className="h2 text-blue-normal">
        {t('status-check-passport-printed')}
      </h2>
      <ul className="list-disc space-y-2 pl-10 mb-5">
        <li>{t('ready-for-pickup.check-receipt')}</li>
        <li>{t('ready-for-pickup.do-not-visit')}</li>
      </ul>
    </>
  )
}

export default CheckStatusReadyForPickup
