import { FC } from 'react'
import Link from 'next/link'

export interface LinkSummaryItem {
  href: string
  text: string
}

export interface LinkSummaryProps {
  title?: string
  links: LinkSummaryItem[]
}

const LinkSummary: FC<LinkSummaryProps> = ({ title, links }) => {
  return (
    <section className="mt-5">
      <p>{title}</p>
      <ul className="list-disc pb-6 ml-4">
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
