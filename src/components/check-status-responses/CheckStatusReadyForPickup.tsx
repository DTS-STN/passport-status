import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import AlertSection from '../AlertSection'

export const CheckStatusReadyForPickup: FC<{}> = () => {
  const { t } = useTranslation('status')
  return (
    <>
      <h1 data-testid="ready-for-pickup" className="h1">
        {t('ready-for-pickup.has-been-printed')}
      </h1>
      <AlertSection type="success">
        <h2 data-testid="check-receipt">
          {t('ready-for-pickup.check-receipt')}
        </h2>
        <p>{t('ready-for-pickup.receipt-details')}</p>
      </AlertSection>
      <p>{t('ready-for-pickup.not-available')}</p>
    </>
  )
}

export default CheckStatusReadyForPickup
