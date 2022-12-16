import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusReadyForPickup: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="ready-for-pickup">
        {t('ready-for-pickup.has-been-printed')}
      </p>
      <p>{t('ready-for-pickup.do-not-visit')}</p>
    </>
  )
}

export default CheckStatusReadyForPickup