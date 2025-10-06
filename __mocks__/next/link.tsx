import { PropsWithChildren } from 'react';

interface LinkProps extends PropsWithChildren {
  href: string;
}

const Link = ({ children, href }: LinkProps) => {
  return <a href={href}>{children}</a>;
};

export default Link;
