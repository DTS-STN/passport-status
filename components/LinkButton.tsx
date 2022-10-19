import { FC } from 'react'
import Link from 'next/link'

export interface LinkButtonProps {
  href: string
  text: string
  id?: string
  lang?: string
  external?: boolean
}

const LinkButton: FC<LinkButtonProps> = ({
  href,
  text,
  id,
  lang,
  external,
}) => {
  return (
    <Link href={href} passHref>
      <a
        target={external ? '_blank' : ''}
        rel={external ? 'noopener noreferrer' : ''}
        id={id}
        lang={lang}
        className="font-display border-blue-dark bg-blue-dark text-basic-white hover:bg-blue-normal inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white focus:bg-blue-normal active:bg-blue-active"
      >
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
