import { FC } from 'react'
import Link from 'next/link'

export interface LinkButton {
  href: string
  text: string
  id?: string
  lang?: string
}

const LinkButton: FC<LinkButton> = ({ href, text, id, lang }) => {
  return (
    <Link href={href} passHref>
      <a
        id={id}
        lang={lang}
        className={`
        font-display
        border-blue-dark
        bg-blue-dark 
        text-basic-white 
        hover:bg-blue-normal 
        inline-block 
        text-center 
        align-middle 
        rounded 
        border
        py-2 
        px-10 
        focus:ring-1 
        focus:ring-offset-2
        focus:ring-black 
        focus:text-basic-white
        focus:bg-blue-normal
        active:bg-[#16446c]`}
      >
        {text}
      </a>
    </Link>
  )
}

export default LinkButton
