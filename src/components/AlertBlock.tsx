import { useTranslation } from 'next-i18next/pages';

import type { AlertPage } from '../lib/types';
import { useAlerts } from '../lib/useAlerts';
import AlertSection from './AlertSection';
import { MarkdownContent } from './MarkdownContent';

export interface AlertBlockProps {
  page?: AlertPage;
  className?: string;
}

const AlertBlock = ({ page, className }: AlertBlockProps) => {
  const { data } = useAlerts({ page });
  const { i18n } = useTranslation();

  if (!data?.length) return null;

  return (
    <div className={`${className} pt-4`}>
      {data?.map(({ textEn, textFr, type, uid }) => {
        const markdown = i18n.language === 'fr' ? textFr : textEn;
        return (
          <AlertSection key={uid} type={type} background>
            <MarkdownContent markdown={markdown} />
          </AlertSection>
        );
      })}
    </div>
  );
};

export default AlertBlock;
