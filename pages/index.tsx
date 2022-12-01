import Image from 'next/image'
import Link from 'next/link'
import LinkButton from '../components/LinkButton'
import MetaData from '../components/MetaData'
import defaultTranslations from '../public/locales/defaultTranslations.json'

const Index = () => {
  return (
    <main
      role="main"
      className="flex bg-splash-page bg-cover bg-center h-screen"
    >
      <MetaData
        author={defaultTranslations.meta.author}
        desc={defaultTranslations.meta.desc}
        title={defaultTranslations.meta.title}
      />
      <div className="m-auto w-[300px] md:w-[400px] lg:w-[500px] bg-white">
        <div className="p-8">
          <h1 className="sr-only">service.canada.ca-passport-status-checker</h1>
          <div className="w-11/12 lg:w-2/3">
            <Image
              src="/sig-blk-en.svg"
              alt="Government of Canada"
              width={10}
              height={1}
              layout="responsive"
              objectFit="scale-down"
            />
            <span className="sr-only">
              {' '}
              / <span lang="fr">Gouvernement du Canada</span>
            </span>
          </div>
          <div className="flex gap-6 items-stretch mt-11 mb-2">
            <section className="w-full" lang="en">
              <h2 className="sr-only">Government of Canada</h2>
              <LinkButton
                href="/en/expectations"
                text="English"
                id="english-button"
                style="primary"
                fullWidth
              />
            </section>
            <section className="w-full" lang="fr">
              <h2 className="sr-only">Gouvernement du Canada</h2>
              <LinkButton
                href="/fr/expectations"
                text="Français"
                id="french-button"
                style="primary"
                fullWidth
              />
            </section>
          </div>
        </div>
        <div className="p-8 flex gap-6 justify-between items-center bg-gray-light">
          <div className="text-bright-blue-dark">
            <Link href="https://www.canada.ca/en/transparency/terms.html">
              <a className="hover:underline" lang="en" data-cy="terms">
                Terms &amp; conditions
              </a>
            </Link>
            <span className="text-gray-400"> • </span>
            <Link href="https://www.canada.ca/fr/transparence/avis.html">
              <a className="hover:underline" lang="fr" data-cy="avis">
                Avis
              </a>
            </Link>
          </div>
          <div className="w-5/12 xl:w-4/12">
            <img src="/wmms-blk.svg" alt="Symbol of the Government of Canada" />
            <span className="sr-only">
              {' '}
              / <span lang="fr">Symbole du gouvernement du Canada</span>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Index
