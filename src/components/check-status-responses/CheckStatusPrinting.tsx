import { useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'

export const CheckStatusPrinting = () => {
  const { t } = useTranslation('status')
  return (
    <>
      <AlertBlock page="status-ready-pickup" />
      <h1 data-testid="printing" className="h1" tabIndex={-1}>
        {t('printing.in-printing')}
      </h1>
      <p>{t('printing.reviewed-printing')}</p>
      <p>{t('printing.print-update')}</p>
    </>
  )
}

export default CheckStatusPrinting
