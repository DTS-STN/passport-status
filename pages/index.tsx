import Image from 'next/image'
import Link from 'next/link'
import LinkButton from '../components/LinkButton'
import MetaData from '../components/MetaData'
import defaultTranslations from '../utils/defaultTranslations.json'

const Index = () => {
  return (
    <div role="main" className="container mx-auto px-6 my-5 bg-slate-300 p-12">
      <MetaData
        data={{
          author: defaultTranslations.meta.author,
          desc: defaultTranslations.meta.desc,
          keywords: defaultTranslations.meta.keywords,
          title: defaultTranslations.meta.title,
        }}
      />
      <div className="flex flex-col justify-center items-center m-auto">
        <div className="z-10 bg-white h-auto w-[18.75rem] xl:w-[31.25rem]">
          <h1 className="sr-only">service.canada.ca-digital-center</h1>

          <div className="h-auto w-64 mx-auto pt-6 xl:w-2/3 xl:mx-0 xl:px-6">
            <Image
              src="/sig-blk-en.svg"
              alt="Government of Canada / Gouvernement du Canada logo"
              width={10}
              height={1}
              layout="responsive"
              objectFit="scale-down"
            ></Image>
          </div>
          <div className="flex w-max container py-11 mx-auto font-display">
            <div className="grid grid-cols-2 gap-2 xl:gap-6">
              <LinkButton
                href="/en/landing"
                text="English"
                id="english-button"
                lang="en"
              />
              <LinkButton
                href="/fr/landing"
                text="Français"
                id="french-button"
                lang="fr"
              />
            </div>
          </div>
        </div>

        <div className="relative py-8 bg-gray-light text-p h-auto min-w-[18.75rem] w-[18.75rem] flex justify-between p-6 xl:w-[31.25rem] xl:items-center">
          <div className="w-28 text-base xl:text-p xl:w-max font-body text-bright-blue-dark">
            <Link href="https://www.canada.ca/en/transparency/terms.html">
              <a
                className="inline-block w-28 xl:w-max mr-0 hover:underline splash-a text-lg"
                lang="en"
                data-cy="terms"
              >
                Terms &amp; conditions
              </a>
            </Link>
            <span> • </span>
            <Link href="https://www.canada.ca/fr/transparence/avis.html">
              <a
                className="inline-block hover:underline font-body text-lg"
                lang="fr"
                data-cy="avis"
              >
                Avis
              </a>
            </Link>
          </div>
          <img className="h-auto w-24 xl:w-28" src="/wmms-blk.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Index
