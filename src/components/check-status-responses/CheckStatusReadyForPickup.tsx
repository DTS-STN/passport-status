import { useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import AlertSection from '../AlertSection'

export const CheckStatusReadyForPickup = () => {
  const { t } = useTranslation('status')
  return (
    <>
      <AlertBlock page="status-ready-pickup" />
      <h1
        id="main-header"
        data-testid="ready-for-pickup"
        className="h1"
        tabIndex={-1}
      >
        {t('ready-for-pickup.has-been-printed')}
      </h1>
      <p>{t('ready-for-pickup.has-been-printed')}</p>
      <AlertSection type="success" className="mb-8">
        <h2 data-testid="check-receipt" className="h2 mt-0">
          {t('ready-for-pickup.check-receipt')}
        </h2>
        <p>{t('ready-for-pickup.receipt-details')}</p>
      </AlertSection>
      <p>{t('ready-for-pickup.not-available')}</p>
      <AlertSection type="info">
        <p className="h3">{t('ready-for-pickup.date-passed')}</p>
      </AlertSection>
    </>
  )
}

export default CheckStatusReadyForPickup
