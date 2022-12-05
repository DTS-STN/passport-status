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
        author={'Service Canada'}
        desc={
          "Error message stating that the server is down, or the URL is incorrect or expired - Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré."
        }
        title={
          statusCode === 500
            ? 'Internal Server Error | Erreur de serveur interne - Canada.ca'
            : 'Service Unavailable | Service indisponible - Canada.ca'
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div lang="en">
          <h1 className="text-2xl">
            We&#39;re having a problem with that page
          </h1>
          <h2>
            {statusCode ? `Error ${statusCode}` : 'An error occurred on client'}
          </h2>
          <p>
            We expect the problem to be fixed shortly. It&#39;s not your
            computer or Internet connection but a problem with our website&#39;s
            server. What next?
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Try refreshing the page or try again later;</li>
            <li>
              Return to the{' '}
              <Link href="/">
                <a className="text-cyan-600 underline hover:text-link-selected">
                  home page
                </a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/en/contact.html"
                className="text-cyan-600 underline hover:text-link-selected"
              >
                Contact us
              </a>
              &nbsp;and we&#39;ll help you out
            </li>
          </ul>
          <p>Thank you for your patience.</p>
        </div>
        <div lang="fr">
          <h1 className="text-2xl">
            Nous éprouvons des difficultés avec cette page
          </h1>
          <h2>
            {statusCode
              ? `Erreur ${statusCode}`
              : 'Erreur produite sur le client'}
          </h2>
          <p>
            Nous espérons résoudre le problème sous peu. Il ne s&#39;agit pas
            d&#39;un problème avec votre ordinateur ou Internet, mais plutôt
            avec le serveur de notre site Web. Que faire?
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Actualisez la page ou réessayez plus tard;</li>
            <li>
              Retournez à la{' '}
              <Link href="/">
                <a className="text-cyan-600 underline hover:text-link-selected">
                  page d&#39;accueil
                </a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/fr/contact.html"
                className="text-cyan-600 underline hover:text-link-selected"
              >
                Communiquez avec nous
              </a>{' '}
              pour obtenir de l&#39;aide.
            </li>
          </ul>
          <p>Merci de votre patience.</p>
        </div>
      </div>
    </ErrorLayout>
  )
}

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  return { statusCode }
}

export default Error
