import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import LinkButton from '../components/LinkButton'
import { getDCTermsTitle } from '../lib/utils/seo-utils'

const Index = () => {
  return (
    <>
      <NextSeo
        title="Passport Application Status Checker | Vérificateur de l'état d'une demande de passeport"
        titleTemplate="%s - Canada.ca"
        additionalMetaTags={[
          getDCTermsTitle(
            "Passport Application Status Checker - Vérificateur de l'état d'une demande de passeport",
          ),
        ]}
      />
      <main
        role="main"
        className="flex h-screen bg-splash-page bg-cover bg-center"
      >
        <div className="m-auto w-[300px] bg-gray-lighter md:w-[400px] lg:w-[500px]">
          <div className="p-8">
            <h1 id="main-header" className="sr-only" tabIndex={-1}>
              Passport Application Status Checker | Vérificateur de l&#39;état
              d&#39;une demande de passeport
            </h1>
            <div className="w-11/12 lg:w-8/12">
              <Image
                className="mb-1.5"
                property="logo"
                alt="Government of Canada"
                src="/sig-blk-en.svg"
                width={300}
                height={28}
                priority
              />
              <span className="sr-only">
                {' '}
                / <span lang="fr">Gouvernement du Canada</span>
              </span>
            </div>
            <div className="mb-2 mt-9 flex justify-center gap-8">
              <section className="w-36" lang="en">
                <h2 className="sr-only">Government of Canada</h2>
                <LinkButton
                  href="/expectations"
                  id="english-button"
                  style="primary"
                  fullWidth
                  locale="en"
                >
                  English
                </LinkButton>
              </section>
              <section className="w-36" lang="fr">
                <h2 className="sr-only">Gouvernement du Canada</h2>
                <LinkButton
                  href="/expectations"
                  id="french-button"
                  style="primary"
                  fullWidth
                  locale="fr"
                >
                  Français
                </LinkButton>
              </section>
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 bg-gray-light p-8">
            <div className="w-7/12 text-blue-light md:w-8/12">
              <a
                className="text-inherit no-underline visited:text-inherit hover:text-inherit hover:underline focus:text-inherit focus:underline"
                data-cy="terms"
                href="https://www.canada.ca/en/transparency/terms.html"
                lang="en"
              >
                Terms &amp; conditions
              </a>
              <span className="text-gray-400"> • </span>
              <a
                className="text-inherit no-underline visited:text-inherit hover:text-inherit hover:underline focus:text-inherit focus:underline"
                data-cy="avis"
                href="https://www.canada.ca/fr/transparence/avis.html"
                lang="fr"
              >
                Avis
              </a>
            </div>
            <div className="w-5/12 md:w-4/12">
              <Image
                alt="Symbol of the Government of Canada"
                src="/wmms-blk.svg"
                width={300}
                height={71}
                priority
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
