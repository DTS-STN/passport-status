import { FC } from 'react'

import Link, { LinkProps } from 'next/link'

type LinkTextProps<T> = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.PropsWithChildren<T>

/**
 * @see https://github.com/i18next/react-i18next/issues/1090#issuecomment-1215615932
 */
const LinkText: FC<LinkTextProps<LinkProps>> = ({
  children,
  href,
  ...restProps
}) => {
  return (
    <Link href={href || ''}>
      <a {...restProps}>{children}</a>
    </Link>
  )
}

export default LinkText
