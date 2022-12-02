import { FC } from 'react'
import { useTranslation } from 'next-i18next'

export const CheckStatusNotAcceptable: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <p data-testid="not-acceptable" className="my-5">
        {t('not-acceptable.cannot-process')}
      </p>
      <p className="my-5">{t('not-acceptable.explanation')}</p>
    </>
  )
}

export default CheckStatusNotAcceptable
