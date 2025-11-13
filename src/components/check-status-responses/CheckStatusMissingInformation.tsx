import { Trans, useTranslation } from 'next-i18next';

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types';
import { formatDateShort } from '../../lib/utils/dates';
import { StatusResultProps } from '../../pages/status';
import ActionButton from '../ActionButton';
import AlertBlock from '../AlertBlock';
import ExternalLink from '../ExternalLink';
import Timeline from '../Timeline';

export const CheckStatusMissingInformation = ({ displayData, checkAnotherHandler }: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'common']);

  const { deliveryMethod, receivedDate, serviceLevel, timelineExists, timelineData } = displayData;

  const serviceDays = serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20';

  const formattedDate = formatDateShort(receivedDate, i18n.language);

  return (
    <div id="response-result">
      <AlertBlock page="status-processing" />
      <h1 id="main-header" data-testid="being-processed" className="h1" tabIndex={-1}>
        {t('missing-information.header')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>
            <Trans
              i18nKey={'missing-information.received-date'}
              ns="status"
              values={{
                receivedDate: formattedDate,
              }}
            />
          </p>
          <p>
            <Trans i18nKey={'missing-information.received-contact'} ns="status" />
          </p>
          <p>
            <Trans i18nKey={'missing-information.received-note'} ns="status" />
          </p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 id="service-standards-header" data-testid="service-standards" className="h2">
            {t('missing-information.service-standards.heading')}
          </h2>
          <Trans
            i18nKey={
              deliveryMethod === DeliveryMethodCode.MAIL
                ? 'missing-information.service-standards.statement-mail'
                : 'missing-information.service-standards.statement'
            }
            ns="status"
            values={{
              serviceLevel: serviceDays,
            }}
            components={{
              Link: <ExternalLink href={t('status-check-contact.service-standard-href')} />,
            }}
          />

          <h2 id="why-message-header" data-testid="why-message" className="h2">
            {t('missing-information.why-message.heading')}
          </h2>
          <p>{t('missing-information.why-message.description')}</p>
          <ul className="mb-5 list-disc space-y-2 pl-10">
            <li>{t('missing-information.why-message.list.item-1')}</li>
            <li>{t('missing-information.why-message.list.item-2')}</li>
          </ul>

          <h2 id="hear-from-us-header" data-testid="hear-from-us" className="h2">
            {t('missing-information.hear-from-us.heading')}
          </h2>
          <p>
            <Trans
              i18nKey={'missing-information.hear-from-us.description'}
              ns="status"
              components={{
                TTY: <abbr title={t('common:tty')} />,
              }}
            />
          </p>

          <h2 id="already-spoken-header" data-testid="already-spoken" className="h2">
            {t('missing-information.already-spoken.heading')}
          </h2>
          <p>{t('missing-information.already-spoken.description')}</p>

          <div className="mt-8">
            <ActionButton onClick={checkAnotherHandler} text={t('status:check-another')} style="primary" />
          </div>
        </div>
        {timelineExists && (
          <div className="hidden w-full max-w-[350px] md:flex">
            <div className="-mt-6">
              <Timeline entries={timelineData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatusMissingInformation;
