import { FC } from 'react'

import Image from 'next/image'

import DateModified from './DateModified'

export interface FooterLogo {
  src: string
  alt: string
  width: number
  height: number
}

export interface FooterLink {
  link: string
  linkText: string
}

export interface FooterProps {
  /**
   * footer canada-ca logo
   */
  footerLogo: FooterLogo

  /**
   * Screenreader section indicator
   */
  footerNav1?: string

  /**
   * Screenreader section indicator
   */
  footerNav2?: string

  /**
   * array of objects containing the link text and link
   */
  links: FooterLink[]
  dateModifiedText: string
}

/**
 * footer element for all pages
 */
const Footer: FC<FooterProps> = ({
  footerLogo,
  links,
  footerNav1,
  footerNav2,
  dateModifiedText,
}: FooterProps) => {
  return (
    <footer>
      <h2 className="sr-only">siteFooter</h2>
      <DateModified text={dateModifiedText} />
      <div className="w-full">
        <div className="h-full w-full bg-gray-light pb-4">
          <div className="container mx-auto flex h-auto flex-col px-4 pt-5 md:justify-between xl:flex xl:flex-row">
            <div
              className="mt-3.5 xl:mt-5"
              role="navigation"
              aria-labelledby="footerNav2"
            >
              <h3 className="sr-only" id="footerNav2">
                {footerNav2}
              </h3>
              <ul className="flex flex-col md:grid md:grid-cols-2 lg:flex-row xl:flex">
                {links.map(({ link, linkText }, index) => (
                  <li
                    key={link}
                    className={
                      index === 0
                        ? 'mb-5 mr-2.5 list-inside list-disc text-sm lg:mb-4 xl:list-none'
                        : 'mb-5 mr-2.5 list-inside list-disc text-sm lg:mb-4'
                    }
                  >
                    <a
                      className="font-body text-sm text-[#21303F] hover:text-[#5E8EBD]"
                      data-cy="social-media-link"
                      href={link}
                    >
                      {linkText}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Image
                className="float-right mb-2.5 mt-8 h-6 w-auto md:h-10 xl:mt-0"
                alt={footerLogo.alt}
                src={footerLogo.src}
                width={footerLogo.width}
                height={footerLogo.height}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
