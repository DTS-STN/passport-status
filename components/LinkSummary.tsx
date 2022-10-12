import { FC } from 'react'
import Link from 'next/link'

export interface LinkSummaryItem {
  href: string
  text: string
}

export interface LinkSummaryProps {
  id: string
  links: LinkSummaryItem[]
}

const LinkSummary: FC<LinkSummaryProps> = ({ id, links }) => {
  return (
    <section id={id}>
      <ul className="list-none pb-6 ml-4">
        {links.map(({ href, text }, index) => (
          <li key={index} className="text-link-default">
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LinkSummary
