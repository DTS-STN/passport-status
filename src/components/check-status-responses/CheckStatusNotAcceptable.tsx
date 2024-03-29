import { Trans, useTranslation } from 'next-i18next'

import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

export const CheckStatusNotAcceptable = () => {
  const { t } = useTranslation(['status', 'common'])
  return (
    <>
      <h1 data-testid="not-acceptable" className="h1" tabIndex={-1}>
        {t('not-acceptable.cannot-process')}
      </h1>
      <AlertBlock page="status-invalid" />
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
    </>
  )
}

export default CheckStatusNotAcceptable
