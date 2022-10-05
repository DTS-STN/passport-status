import { FC } from 'react'
import Link from 'next/link'

export interface LinkButton {
  href: string
  text: string
}

const LinkButton: FC<LinkButton> = ({ href, text }) => {
  return (
    <Link href={href} passHref>
      <a
        className={`
        border-blue-deep
        bg-blue-dark 
        text-basic-white 
        hover:bg-blue-normal 
        inline-block 
        text-center 
        align-middle 
        rounded 
        border
        py-2.5 
        px-3.5 
        focus:ring-2 
        focus:ring-offset-2 `}
      >
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
