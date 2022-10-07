import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Header: FC = () => {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation('common')

  const langSelectorLocale = locale === 'en' ? 'fr' : 'en'
  const langSelectorAbbreviation = langSelectorLocale === 'fr' ? 'FR' : 'EN'
  const langSelectorText = langSelectorLocale === 'fr' ? 'Français' : 'English'

  return (
    <>
      <nav
        role="navigation"
        aria-label={t('skip-to.main-content')}
        className="absolute w-px h-px -left-96 focus-within:w-screen focus-within:h-auto focus-within:top-4 focus-within:z-50 focus-within:flex focus-within:justify-center"
      >
        <a
          id="skipToMainContent"
          className="bg-blue-800 text-white px-2 focus:outline-black-solid hover:bg-gray-dark"
          href="#mainContent"
          draggable="false"
        >
          {t('skip-to.main-content')}
        </a>
      </nav>

      <header>
        <div className="container mx-auto px-6 flex-col flex md:flex md:flex-row justify-between pt-6">
          <div className="flex flex-row justify-between items-center lg:mt-7">
            <a href={t('goc-link')}>
              <img
                className="h-5 w-auto xs:h-6 sm:h-8 md:h-8 lg:h-7 xl:h-8 "
                src={locale === 'en' ? '/sig-blk-en.svg' : '/sig-blk-fr.svg'}
                alt={
                  locale === 'en'
                    ? 'Government of Canada'
                    : 'Gouvernement du Canada'
                }
              />
            </a>

            {/* Language selector for small screens */}
            <Link href={asPath} locale={langSelectorLocale} replace>
              <a
                className={`block md:hidden md:text-sm ml-6 pb-2 sm:ml-16 underline decoration-dotted cursor-help font-body font-bold text-[#284162] text-base hover:text-[#0535d2]`}
                lang={langSelectorLocale}
              >
                <abbr title={langSelectorText}>{langSelectorAbbreviation}</abbr>
              </a>
            </Link>
          </div>

          <div className="flex-col flex">
            {/* Language selector for mid to larger screens */}
            <Link href={asPath} locale={langSelectorLocale} replace>
              <a
                className="md:block hidden pb-0 lg:pb-4 self-end underline font-body text-[#284162] hover:text-[#0535d2]"
                data-cy="toggle-language-link"
                lang={langSelectorLocale}
              >
                {langSelectorText}
              </a>
            </Link>
            {/* Placeholder for SearchBar in case is back in ver 4??? */}
            {/* <SearchBar /> */}
          </div>
        </div>

        {/* Border */}
        <div className="mb-2 border-t pb-2 mt-4"></div>

        {/* <Menu
          loginText={t('login')}
          items={[
            {
              link: '/search',
              text: t('service-and-benefits'),
            },
            {
              link: '/',
              text: t('tools'),
            },
            {
              link: '/',
              text: t('contact-us'),
            },
          ]}
        /> */}

        {/* Place Holder for the breadcrumbs

        <div className="layout-container my-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        */}
      </header>
    </>
  )
}

export default Header
