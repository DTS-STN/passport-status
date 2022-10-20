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
      <ul className="list-disc pb-6 ml-4 space-y-4">
        {links.map(({ href, text, external }, index) => (
          <li
            key={index}
            className="text-link-default hover:text-link-selected focus:text-link-selected"
          >
            <Link href={href} passHref>
              <a
                target={external ? '_blank' : ''}
                rel={external ? 'noopener noreferrer' : ''}
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
