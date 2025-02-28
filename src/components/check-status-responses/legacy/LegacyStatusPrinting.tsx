import { MouseEventHandler } from 'react'

import { useTranslation } from 'next-i18next'

import ActionButton from '../../ActionButton'
import AlertBlock from '../../AlertBlock'

export type LegacyPrintingProps = {
  checkAnotherHandler: MouseEventHandler<HTMLButtonElement>
}

export const LegacyCheckStatusPrinting = ({
  checkAnotherHandler,
}: LegacyPrintingProps) => {
  const { t } = useTranslation('status')
  return (
    <div id="response-result">
      <AlertBlock page="status-printing" />
      <h1
        id="main-header"
        data-testid="legacy-printing"
        className="h1"
        tabIndex={-1}
      >
        {t('legacy.printing.in-printing')}
      </h1>
      <div className="max-w-prose">
        <p>{t('legacy.printing.reviewed-printing')}</p>
        <p>{t('legacy.printing.print-update')}</p>
        <div className="mt-8">
          <ActionButton
            onClick={checkAnotherHandler}
            text={t('check-another')}
            style="primary"
          />
        </div>
      </div>
    </div>
  )
}

export default LegacyCheckStatusPrinting
