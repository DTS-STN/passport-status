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
      <h1 className="sr-only" lang="en">
        Not Found
      </h1>
      <span className="sr-only">
        {' '}
        / <span lang="fr">Pas trouvé</span>
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div lang="en">
          <h2 className="h1">We couldn&#39;t find that Web page</h2>
          <p className="h2">Error 404</p>
          <p>
            We&#39;re sorry you ended up here. Sometimes a page gets moved or
            deleted, but hopefully we can help you find what you&#39;re looking
            for. What next?
          </p>
          <ul className="list-disc pl-10 space-y-2">
            <li>
              Return to the{' '}
              <Link href="/" locale="default">
                <a className="underline text-link-default hover:text-link-selected focus:text-link-selected visited:text-link-visited">
                  home page
                </a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/en/contact.html"
                className="underline text-link-default hover:text-link-selected focus:text-link-selected visited:text-link-visited"
              >
                Contact us
              </a>{' '}
              and we&#39;ll help you out.
            </li>
          </ul>
        </div>
        <div lang="fr">
          <h2 className="h1">Nous ne pouvons trouver cette page Web</h2>
          <p className="h2">Erreur 404</p>
          <p>
            Nous sommes désolés que vous ayez abouti ici. Il arrive parfois
            qu&#39;une page ait été déplacée ou supprimée. Heureusement, nous
            pouvons vous aider à trouver ce que vous cherchez. Que faire?
          </p>
          <ul className="list-disc pl-10 space-y-2">
            <li>
              Retournez à la{' '}
              <Link href="/" locale="default">
                <a className="underline text-link-default hover:text-link-selected focus:text-link-selected visited:text-link-visited">
                  page d&#39;accueil
                </a>
              </Link>
              ;
            </li>
            <li>
              <a
                href="https://www.canada.ca/fr/contact.html"
                className="underline text-link-default hover:text-link-selected focus:text-link-selected visited:text-link-visited"
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
