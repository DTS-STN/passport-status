import { NextPage } from 'next'
import Link from 'next/link'
import ErrorLayout from '../components/ErrorLayout'
import MetaData from '../components/MetaData'

export interface ErrorProps {
  statusCode: number | undefined
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <ErrorLayout>
      <MetaData
        data={{
          author: 'Service Canada',
          desc: "Error message stating that the server is down, or the URL is incorrect or expired - Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré.",
          keywords: '',
          title:
            statusCode === 500
              ? 'Internal Server Error | Erreur de serveur interne - Canada.ca'
              : 'Service Unavailable | Service indisponible - Canada.ca',
        }}
      />
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
            <Link href="/">
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
            <Link href="/">
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
    </ErrorLayout>
  )
}

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  return { statusCode }
}

export default Error
