import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusNotAcceptable: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="not-acceptable">{t('not-acceptable.cannot-process')}</p>
      <p>{t('not-acceptable.explanation')}</p>
    </>
  )
}

export default CheckStatusNotAcceptable
