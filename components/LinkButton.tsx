import { FC } from 'react'
import Link from 'next/link'

export interface LinkButtonProps {
  href: string
  text: string
  id?: string
  lang?: string
  external?: boolean
  style?: 'default' | 'primary' | 'super' | 'danger'
}

const LinkButton: FC<LinkButtonProps> = ({
  href,
  text,
  id,
  lang,
  external,
  style,
}) => {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white '
  switch (style) {
    case 'primary':
      classStyle +=
        'border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active shadow-sm'
      break
    default:
      classStyle +=
        'border-gray-dark bg-gray-normal text-blue-light hover:bg-gray-dark hover:border-l-gray-deep hover:border-t-gray-deep focus:text-blue-light focus:bg-gray-dark shadow-sm border-r-gray-500 border-b-gray-500'
      break
  }
  return (
    <Link href={href} passHref>
      <a
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        id={id}
        lang={lang}
        className={classStyle}
      >
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
