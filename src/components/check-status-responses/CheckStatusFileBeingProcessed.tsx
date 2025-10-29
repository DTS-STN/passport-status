import { Trans, useTranslation } from 'next-i18next';

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types';
import { formatDateShort } from '../../lib/utils/dates';
import { StatusResultProps } from '../../pages/status';
import ActionButton from '../ActionButton';
import AlertBlock from '../AlertBlock';
import ExternalLink from '../ExternalLink';
import Timeline from '../Timeline';

export const CheckStatusFileBeingProcessed = ({ displayData, checkAnotherHandler }: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'common']);

  const { deliveryMethod, receivedDate, serviceLevel, timelineExists, timelineData } = displayData;

  const serviceDays = serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20';

  const formattedDate = formatDateShort(receivedDate, i18n.language);

  return (
    <div id="response-result">
      <AlertBlock page="status-processing" />
      <h1 id="main-header" data-testid="being-processed" className="h1" tabIndex={-1}>
        {t('being-processed.reviewing-application')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>
            <Trans
              i18nKey={'being-processed.processing-details'}
              ns="status"
              values={{
                reviewDays: serviceLevel === ServiceLevelCode.TEN_DAYS ? '7' : '15',
                printDays: serviceLevel === ServiceLevelCode.TEN_DAYS ? '3' : '5',
              }}
            />
          </p>
          {deliveryMethod === DeliveryMethodCode.MAIL && (
            <p>
              <Trans
                i18nKey={'being-processed.completion-status'}
                ns="status"
                values={{
                  serviceLevel: serviceDays,
                }}
              />
            </p>
          )}
          {timelineExists && (
            <div className="flex justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 className="h2 mt-8 mb-2">{t('being-processed.service-standards.heading')}</h2>
          <p>
            <Trans
              i18nKey={
                deliveryMethod === DeliveryMethodCode.MAIL
                  ? 'being-processed.service-standards.received-date-mail'
                  : 'being-processed.service-standards.received-date'
              }
              ns="status"
              values={{
                receivedDate: formattedDate,
                serviceLevel: serviceDays,
              }}
              components={{
                Link: <ExternalLink href={t('being-processed.service-standards.service-standards-href')} />,
              }}
            />
          </p>
          {deliveryMethod === DeliveryMethodCode.IN_PERSON && (
            <p>{t('status:being-processed.service-standards.urgent-service-note')}</p>
          )}
          <h2 className="h2 mt-8 mb-2">{t('being-processed.expedited-service.heading')}</h2>
          <p>
            <Trans
              i18nKey={'being-processed.expedited-service.details'}
              ns="status"
              components={{
                Link: <ExternalLink href={t('being-processed.expedited-service.expedited-service-href')} />,
              }}
            />
          </p>
          <h2 className="h2 mt-8 mb-2">{t('status:being-processed.incomplete-applications.heading')}</h2>
          <p>
            <Trans i18nKey={'being-processed.incomplete-applications.description'} ns="status" />
          </p>
          <p>{t('status:being-processed.incomplete-applications.return-notice')}</p>
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

export default CheckStatusFileBeingProcessed;
