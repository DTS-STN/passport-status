import { FC } from 'react'
import Link from 'next/link'

export interface LinkButtonProps {
  external?: boolean
  fullWidth?: boolean
  href: string
  id?: string
  lang?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  style?: 'default' | 'primary'
  text: string
}

const sizes = {
  xs: 'px-1.5 py-px rounded-sm text-sm',
  sm: 'px-2.5 py-1.5 rounded-sm text-sm',
  md: 'px-3.5 py-2.5 rounded text-base',
  lg: 'px-4 py-2.5 rounded-md text-lg',
}

const styles = {
  default:
    'border-gray-dark bg-gray-normal text-blue-light hover:bg-gray-dark hover:border-l-gray-deep hover:border-t-gray-deep focus:text-blue-light focus:bg-gray-dark border-r-gray-500 border-b-gray-500',
  primary:
    'border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active',
}

const LinkButton: FC<LinkButtonProps> = ({
  external,
  fullWidth,
  href,
  id,
  lang,
  size,
  style,
  text,
}) => {
  const baseClasses =
    'inline-flex justify-center items-center font-display align-middle border shadow-sm focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white'
  const fullWidthClasses = fullWidth ? 'w-full' : undefined
  const sizeClasses = sizes[size ?? 'md']
  const styleClasses = styles[style ?? 'default']

  return (
    <Link href={href} passHref>
      <a
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        id={id}
        lang={lang}
        className={`${baseClasses} ${fullWidthClasses} ${sizeClasses} ${styleClasses}`}
      >
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
