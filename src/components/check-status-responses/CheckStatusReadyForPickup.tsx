import { Trans, useTranslation } from 'next-i18next';

import { StatusResultProps } from '../../pages/status';
import ActionButton from '../ActionButton';
import AlertBlock from '../AlertBlock';
import ExternalLink from '../ExternalLink';
import Timeline from '../Timeline';

export const CheckStatusReadyForPickup = (props: StatusResultProps) => {
  const { t } = useTranslation(['status', 'timeline']);

  const { displayData, checkAnotherHandler } = props;

  const { timelineExists, timelineData } = displayData;

  return (
    <>
      <AlertBlock page="status-ready-pickup" />
      <h1 id="main-header" data-testid="ready-for-pickup" className="h1" tabIndex={-1}>
        {t('ready-for-pickup.header')}
      </h1>
      <div className="flex flex-col md:flex-row md:gap-x-30 lg:gap-x-40 xl:gap-x-50">
        <div className="max-w-prose">
          <p>{t('ready-for-pickup.receipt-location')}</p>
          <p>
            <Trans
              i18nKey={'ready-for-pickup.check-hours'}
              ns="status"
              components={{
                Link: <ExternalLink href={t('ready-for-pickup.check-hours-href')} />,
              }}
            />
          </p>
          {timelineExists && (
            <div className="flex w-full justify-center md:hidden">
              <Timeline entries={timelineData} />
            </div>
          )}
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
    </>
  );
};

export default CheckStatusReadyForPickup;
