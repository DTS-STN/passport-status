import { Trans, useTranslation } from 'next-i18next';

import { DeliveryMethodCode, ServiceLevelCode } from '../../lib/types';
import { formatDateShort } from '../../lib/utils/dates';
import { StatusResultProps } from '../../pages/status';
import ActionButton from '../ActionButton';
import AlertBlock from '../AlertBlock';
import Collapse from '../Collapse';
import ExternalLink from '../ExternalLink';
import Timeline from '../Timeline';

export const CheckStatusPrinting = ({ displayData, checkAnotherHandler }: StatusResultProps) => {
  const { deliveryMethod } = displayData;

  return deliveryMethod === DeliveryMethodCode.MAIL ? (
    <CheckStatusPrintingMail displayData={displayData} checkAnotherHandler={checkAnotherHandler} />
  ) : (
    <CheckStatusPrintingInPerson displayData={displayData} checkAnotherHandler={checkAnotherHandler} />
  );
};

const CheckStatusPrintingInPerson = ({ displayData, checkAnotherHandler }: StatusResultProps) => {
  const { t } = useTranslation(['status', 'timeline']);
  const { timelineExists, timelineData } = displayData;

  return (
    <div id="response-result">
      <AlertBlock page="status-printing" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('printing.in-printing')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('printing.in-person.reviewed')}</p>
          <p>
            <Trans i18nKey={'printing.in-person.urgent'} ns="status" />
          </p>
          <p>{t('printing.in-person.problem')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <div className="mt-8">
            <ActionButton onClick={checkAnotherHandler} text={t('check-another')} style="primary" />
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

const CheckStatusPrintingMail = ({ displayData, checkAnotherHandler }: StatusResultProps) => {
  const { t, i18n } = useTranslation(['status', 'timeline']);

  const { receivedDate, serviceLevel, timelineExists, timelineData } = displayData;

  const serviceDays = serviceLevel === ServiceLevelCode.TEN_DAYS ? '10' : '20';

  const formattedDate = formatDateShort(receivedDate, i18n.language);

  return (
    <div id="response-result">
      <AlertBlock page="status-printing" />
      <h1 id="main-header" data-testid="printing" className="h1" tabIndex={-1}>
        {t('printing.in-printing')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('printing.mail.reviewed')}</p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
          <h2 id="service-standards-header" data-testid="service-standards" className="h2">
            {t('printing.mail.service-standards.header')}
          </h2>
          <p>
            <Trans
              i18nKey={'printing.mail.service-standards.we-received'}
              ns="status"
              values={{ receivedDate: formattedDate, serviceLevel: serviceDays }}
              components={{
                Link: <ExternalLink href={t('status-check-contact.service-standard-href')} />,
              }}
            />
          </p>
          <Collapse title={t('printing.mail.renewing.header')} variant="slim">
            <p className="border-l-[6px] border-gray-400 pl-6 text-base text-gray-600">
              <Trans i18nKey={'printing.mail.renewing.details'} ns="status" values={{ serviceLevel: serviceDays }} />
            </p>
          </Collapse>
          <div className="mt-8">
            <ActionButton onClick={checkAnotherHandler} text={t('check-another')} style="primary" />
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

export default CheckStatusPrinting;
