import { AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

import { useTranslation } from 'next-i18next';

export interface ExternalLinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    PropsWithChildren {
  href: string;
}

export const ExternalLink = ({ children, href, ...rest }: ExternalLinkProps) => {
  const { t } = useTranslation(['common']);
  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">{t('opens-in-new-tab')}</span>
    </a>
  );
};

export default ExternalLink;
