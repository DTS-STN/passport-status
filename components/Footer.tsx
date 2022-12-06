import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import DateModified from './DateModified'

export interface FooterLink {
  link: string
  linkText: string
}

export interface FooterProps {
  /**
   * alt text for footer canada-ca logo
   */
  footerLogoAltText: string

  /**
   * image path for footer logo
   */
  footerLogoImage: string
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
export default function Footer({
  footerLogoAltText,
  footerLogoImage,
  links,
  footerNav1,
  footerNav2,
  dateModifiedText,
}: FooterProps) {
  return (
    <footer>
      <h2 className="sr-only">siteFooter</h2>
      <DateModified text={dateModifiedText} />
      <div className="w-full">
        <div className="w-full h-full pb-4 bg-gray-light">
          <div className="h-auto pt-5 container mx-auto px-4 flex flex-col xl:flex xl:flex-row md:justify-between">
            <div
              className="mt-3.5 xl:mt-5"
              role="navigation"
              aria-labelledby="footerNav2"
            >
              <h3 className="sr-only" id="footerNav2">
                {footerNav2}
              </h3>
              <ul className="flex flex-col md:grid md:grid-cols-2 xl:flex lg:flex-row">
                {links.map(({ link, linkText }, index) => (
                  <li
                    key={link}
                    className={
                      index === 0
                        ? 'lg:mb-4 mb-5 mr-2.5 list-inside list-disc xl:list-none text-sm'
                        : 'lg:mb-4 mb-5 mr-2.5 list-inside list-disc text-sm'
                    }
                  >
                    <a
                      className="text-sm font-body text-[#21303F] hover:text-[#5E8EBD]"
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
              <img
                className="mb-2.5 mt-8 xl:mt-0 h-6 md:h-10 w-auto float-right"
                src={footerLogoImage}
                alt={footerLogoAltText}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
