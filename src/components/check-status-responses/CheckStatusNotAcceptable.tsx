import { MouseEventHandler } from 'react'

import { useTranslation } from 'next-i18next'

import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'

export interface CheckStatusNotAcceptableProps {
  checkAnotherHandler: MouseEventHandler<HTMLButtonElement>
}

export const CheckStatusNotAcceptable = ({
  checkAnotherHandler,
}: CheckStatusNotAcceptableProps) => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <div id="response-result">
      <AlertBlock page="status-invalid" />
      <h1
        id="main-header"
        data-testid="not-acceptable"
        className="h1"
        tabIndex={-1}
      >
        {t('not-acceptable.header')}
      </h1>
      <div className="max-w-prose">
        <p>{t('not-acceptable.unable-to-process')}</p>
        <h2>{t('not-acceptable.next-steps.header')}</h2>
        <p>{t('not-acceptable.next-steps.sent-letter')}</p>
        <p>{t('not-acceptable.next-steps.please-wait')}</p>
        <div className="mt-8">
          <ActionButton
            onClick={checkAnotherHandler}
            text={t('status:check-another')}
            style="primary"
          />
        </div>
      </div>
    </div>
  )
}

export default CheckStatusNotAcceptable
