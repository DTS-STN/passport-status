import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import LinkButton from '../components/LinkButton'

const Index = () => {
  return (
    <>
      <NextSeo
        noindex
        title="Passport Application Status Checker (PASC) | Vérificateur du Statut de mon application pour un passport (VSAP)"
        titleTemplate={'%s \u2010 Canada.ca'}
      />
      <main
        role="main"
        className="flex bg-splash-page bg-cover bg-center h-screen"
      >
        <div className="m-auto w-[300px] md:w-[400px] lg:w-[500px] bg-gray-lighter">
          <div className="p-8">
            <h1 className="sr-only">
              service.canada.ca-passport-status-checker
            </h1>
            <div className="w-11/12 lg:w-8/12">
              <Image
                alt="Government of Canada"
                className="mb-1.5"
                height={26}
                layout="responsive"
                objectFit="scale-down"
                property="logo"
                src="/sig-blk-en.svg"
                width={283}
              />
              <span className="sr-only">
                {' '}
                / <span lang="fr">Gouvernement du Canada</span>
              </span>
            </div>
            <div className="flex gap-8 justify-center mt-9 mb-2">
              <section className="w-36" lang="en">
                <h2 className="sr-only">Government of Canada</h2>
                <LinkButton
                  href="/en/expectations"
                  text="English"
                  id="english-button"
                  style="primary"
                  fullWidth
                />
              </section>
              <section className="w-36" lang="fr">
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
            <div className="text-blue-light w-7/12 md:w-8/12">
              <a
                className="text-inherit hover:text-inherit focus:text-inherit visited:text-inherit no-underline hover:underline focus:underline"
                data-cy="terms"
                href="https://www.canada.ca/en/transparency/terms.html"
                lang="en"
              >
                Terms &amp; conditions
              </a>
              <span className="text-gray-400"> • </span>
              <a
                className="text-inherit hover:text-inherit focus:text-inherit visited:text-inherit no-underline hover:underline focus:underline"
                data-cy="avis"
                href="https://www.canada.ca/fr/transparence/avis.html"
                lang="fr"
              >
                Avis
              </a>
            </div>
            <div className="w-5/12 md:w-4/12">
              <img
                src="/wmms-blk.svg"
                alt="Symbol of the Government of Canada"
              />
              <span className="sr-only">
                {' '}
                / <span lang="fr">Symbole du gouvernement du Canada</span>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})

export default Index
