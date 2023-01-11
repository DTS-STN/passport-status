import { FC } from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  /**
   * Text for the breadcrumb
   */
  text: string

  /**
   * Link for the breadcrumb
   */
  link: string
}

export interface BreadcrumbProps {
  /**
   * Array of Items for the breadcrumb
   */
  items?: BreadcrumbItem[]
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumbs">
      <ol>
        {items?.map(({ link, text }, index) => {
          return (
            <li
              key={link}
              className="inline-block mr-4 truncate min-w-0 max-w-full"
            >
              {index > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline-block mr-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <Link href={link}>
                <a className="link text-base">{text}</a>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
