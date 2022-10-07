import { FC } from 'react'
import Link from 'next/link'
import { GetButtonStyle } from './common-styles'

export interface LinkButtonProps {
  href: string
  text: string
  id?: string
  lang?: string
}

const LinkButton: FC<LinkButtonProps> = ({ href, text, id, lang }) => {
  return (
    <Link href={href} passHref>
      <a id={id} lang={lang} className={GetButtonStyle('primary')}>
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
