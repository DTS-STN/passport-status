import { FC } from 'react'
import Link from 'next/link'
import MetaData from './MetaData'

export interface ErrorPageProps {
  statusCode?: number | undefined
}

const ErrorPage: FC<ErrorPageProps> = ({ statusCode }) => {
  let title = ''
  switch (statusCode) {
    case 404:
      title = 'Not Found | Pas trouvé - Canada.ca'
      break
    case 500:
      title = 'Internal Server Error | Erreur de serveur interne - Canada.ca'
      break
    case 503:
      title = 'Service Unavailable | Service indisponible - Canada.ca'
  }
  return (
    <div className="container mx-auto">
      <MetaData
        data={{
          author: 'Service Canada',
          desc: "Error message stating that the server is down, or the URL is incorrect or expired - Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré.",
          keywords: '',
          title: title,
        }}
      />
      <img
        className="h-5 w-auto xs:h-6 sm:h-8 md:h-8 lg:h-7 xl:h-8 my-5 mx-4 lg:mx-6"
        src={'/sig-blk-en.svg'}
        alt="Government of Canada - Gouvernement du Canada"
      />
      <section className="grid grid-cols-1 lg:grid-cols-2 mx-4 lg:mx-6 gap-4 lg:gap-8">
        <div>
          <h1 className="text-2xl">We couldn&#39;t find that Web page</h1>
          <h2>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </h2>
          <p>
            We&#39;re sorry you ended up here. Sometimes a page gets moved or
            deleted, but hopefully we can help you find what you&#39;re looking
            for. What next?
          </p>

          <ul>
            <li>
              Return to the{' '}
              <Link href="/" locale="default">
                <a className="text-cyan-600 underline">home page</a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/en/contact.html"
                className="text-cyan-600 underline"
              >
                Contact us
              </a>
              &nbsp;and we&#39;ll help you out
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl">Nous ne pouvons trouver cette page Web</h1>
          <h2>
            {statusCode
              ? `Erreur ${statusCode}`
              : 'Erreur produite sur le client'}
          </h2>
          <p>
            Nous sommes désolés que vous ayez abouti ici. Il arrive parfois
            qu&#39;une page ait été déplacée ou supprimée. Heureusement, nous
            pouvons vous aider à trouver ce que vous cherchez. Que faire?
          </p>
          <ul>
            <li>
              Retournez à la{' '}
              <Link href="/" locale="default">
                <a className="text-cyan-600 underline">page d&#39;accueil</a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/fr/contact.html"
                className="text-cyan-600 underline"
              >
                Communiquez avec nous
              </a>
              &nbsp;pour obtenir de l&#39;aide.
            </li>
          </ul>
        </div>
      </section>
      <footer className="mt-12 mb-3 flex lg:flex-row-reverse pr-4 lg:pr-6 justify-between">
        <a className="w-32 sm:w-36 pl-4 lg:hidden text-sm font-body" href="#">
          Top of page / Haut de la page&nbsp;
          <span className="font-extrabold">&#8963;</span>
        </a>
        <img
          className="h-6 w-auto lg:h-auto lg:w-40"
          src={'/wmms-blk.svg'}
          alt={
            'Symbol of the Government of Canada - Symbole du gouvernement du Canada'
          }
        />
      </footer>
    </div>
  )
}

export default ErrorPage
