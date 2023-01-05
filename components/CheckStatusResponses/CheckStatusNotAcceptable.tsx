import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusNotAcceptable: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="not-acceptable" className="text-blue-light">
        <b>{t('not-acceptable.cannot-process')}</b>
      </p>
      <p>{t('not-acceptable.explanation')}</p>
    </>
  )
}

export default CheckStatusNotAcceptable
