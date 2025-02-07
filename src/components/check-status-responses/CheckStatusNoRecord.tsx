import { Trans, useTranslation } from 'next-i18next'

import { NoStatusResultProps } from '../../pages/status'
import ActionButton from '../ActionButton'
import AlertBlock from '../AlertBlock'
import ExternalLink from '../ExternalLink'

export const CheckStatusNoRecord = (props: NoStatusResultProps) => {
  const { t } = useTranslation(['status', 'common'])

  const { checkAnotherHandler, tryAgainHandler } = props

  return (
    <>
      <AlertBlock page="status-not-found" />
      <h1 id="main-header" data-testid="no-record" className="h1" tabIndex={-1}>
        {t('no-record.cannot-give-status.description')}
      </h1>
      <p>{t('no-record.cannot-give-status.because')}</p>
      <ul className="mb-5 list-disc space-y-2 pl-10">
        <li>
          <Trans
            i18nKey={'no-record.cannot-give-status.list.item-1'}
            ns="status"
          />
        </li>
        <li>{t('no-record.cannot-give-status.list.item-2')}</li>
      </ul>
      <p>{t('no-record.can-review')}</p>
      <p>
        <Trans
          i18nKey={'no-record.contact-us'}
          ns="status"
          components={{
            Link: (
              <ExternalLink
                href={t('status-check-contact.service-standard-href')}
              />
            ),
            Link2: <ExternalLink href={t('common:contact-us-link')} />,
          }}
        />
      </p>
      <h2 className="h2 mb-2 mt-8">{t('no-record.need-faster')}</h2>
      <p>
        <Trans
          i18nKey={'no-record.get-urgent'}
          ns="status"
          components={{
            Link: (
              <ExternalLink
                href={t('status-check-urgent.express-services-href')}
              />
            ),
          }}
        />
      </p>
      <div className="mt-8 flex-col sm:flex-row">
        <ActionButton
          onClick={tryAgainHandler}
          text={t('status:try-again')}
          style="primary"
        />
        <ActionButton
          onClick={checkAnotherHandler}
          text={t('status:check-another')}
          style="default"
        />
      </div>
    </>
  )
}

export default CheckStatusNoRecord
