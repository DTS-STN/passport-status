import { MouseEventHandler } from 'react'

import { Trans, useTranslation } from 'next-i18next'

import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

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
        {t('not-acceptable.cannot-process')}
      </h1>
      <div className="max-w-prose">
        <p>{t('not-acceptable.explanation')}</p>
        <p>
          <Trans
            i18nKey="not-acceptable.contact-us"
            ns="status"
            components={{
              Link: <ExternalLink href={t('common:contact-us-link')} />,
            }}
          />
        </p>
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
