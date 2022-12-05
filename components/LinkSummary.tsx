import { FC } from 'react'
import Link from 'next/link'

export interface LinkSummaryItem {
  href: string
  text: string
  external?: boolean
}

export interface LinkSummaryProps {
  title?: string
  links: LinkSummaryItem[]
}

const LinkSummary: FC<LinkSummaryProps> = ({ title, links }) => {
  return (
    <section className="mt-5">
      <p>{title}</p>
      <ul className="list-disc space-y-2 pl-10 mb-3">
        {links.map(({ href, text, external }, index) => (
          <li key={index}>
            <Link href={href} passHref>
              <a
                className="text-link-default hover:text-link-selected focus:text-link-selected"
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LinkSummary
