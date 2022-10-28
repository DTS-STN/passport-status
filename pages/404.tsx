import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="container mx-auto">
      <section className="grid grid-cols-1 lg:grid-cols-2 mx-4 lg:mx-6 gap-4 lg:gap-8">
        <div>
          <h1 className="text-2xl">We couldn&#39;t find that Web page</h1>
          <h2>An error 404 occured on server</h2>
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
          <h2>Erreur 404</h2>
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
    </div>
  )
}

export default Custom404
