import { FC } from 'react'
import { Trans, useTranslation } from 'next-i18next'

export const CheckStatusNotAcceptable: FC<{}> = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h2 data-testid="not-acceptable" className="h2">
        {t('not-acceptable.cannot-process')}
      </h2>
      <p>
        <Trans
          i18nKey="not-acceptable.explanation"
          ns="status"
          tOptions={{ phoneNumber: t('common:phone-number') }}
        />
      </p>
    </>
  )
}

export default CheckStatusNotAcceptable
