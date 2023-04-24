import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import AlertSection from '../AlertSection'

export const CheckStatusReadyForPickup: FC<{}> = () => {
  const { t } = useTranslation('status')
  return (
    <>
      <h2 data-testid="ready-for-pickup" className="h2">
        {t('ready-for-pickup.has-been-printed')}
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-10">
        <li>{t('ready-for-pickup.check-receipt')}</li>
        <li>{t('ready-for-pickup.not-available')}</li>
      </ul>
      <AlertSection type="info">
        <p>
          <b>{t('strike-notice.notice')}</b>
        </p>
        <p>{t('strike-notice.ready-for-pickup.non-essential')}</p>
      </AlertSection>
    </>
  )
}

export default CheckStatusReadyForPickup
