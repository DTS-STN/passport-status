import Link from 'next/link'
import ErrorLayout from '../components/ErrorLayout'
import MetaData from '../components/MetaData'

const Custom404 = () => {
  return (
    <ErrorLayout>
      <MetaData
        author={'Service Canada'}
        desc={
          "Error message stating that the server is down, or the URL is incorrect or expired - Message d'erreur indiquant que le serveur est hors service, que l'URL est incorrecte ou qu'elle a expiré."
        }
        title={'Not Found | Pas trouvé - Canada.ca'}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div lang="en">
          <h1 className="text-2xl">We couldn&#39;t find that Web page</h1>
          <h2>Error 404</h2>
          <p>
            We&#39;re sorry you ended up here. Sometimes a page gets moved or
            deleted, but hopefully we can help you find what you&#39;re looking
            for. What next?
          </p>
          <ul className="list-disc list-inside mb-3">
            <li>
              Return to the{' '}
              <Link href="/" locale="default">
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
              </a>{' '}
              and we&#39;ll help you out.
            </li>
          </ul>
        </div>
        <div lang="fr">
          <h1 className="text-2xl">Nous ne pouvons trouver cette page Web</h1>
          <h2>Erreur 404</h2>
          <p>
            Nous sommes désolés que vous ayez abouti ici. Il arrive parfois
            qu&#39;une page ait été déplacée ou supprimée. Heureusement, nous
            pouvons vous aider à trouver ce que vous cherchez. Que faire?
          </p>
          <ul className="list-disc list-inside mb-3">
            <li>
              Retournez à la{' '}
              <Link href="/" locale="default">
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
        </div>
      </div>
    </ErrorLayout>
  )
}

export default Custom404
