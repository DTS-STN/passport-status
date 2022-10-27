import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="min-h-screen">
      <section className="grid lg:grid-cols-3 sm:grid-cols-1 mx-6 xxs:mx-4 xs:px-0 md:px-0 lg:container lg:mx-auto xl:px-12 lg:px-6 pb-44">
        <div className="h-auto xxl:w-400px lg:w-96 xl:h-400px lg:h-500px mb-8 lg:mb-0 col-span-2">
          <h1 className="text-2xl">{"We couldn't find that Web page"}</h1>
          <h2>An error 404 occured on server</h2>
          <p>
            {
              "We're sorry you ended up here. Sometimes a page gets moved or deleted, but hopefully we can help you find what you're looking for. What next?"
            }
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
              <Link href="https://www.canada.ca/en/contact.html">
                <a className="text-cyan-600 underline">Contact us</a>
              </Link>
              {" and we'll help you out."}
            </li>
          </ul>
        </div>
        <div className="h-auto xxl:w-400px lg:w-96 xl:h-400px lg:h-500px mb-8 lg:mb-0">
          <h1 className="text-2xl">Nous ne pouvons trouver cette page Web</h1>
          <h2>Erreur 404</h2>
          <p>
            {
              "Nous sommes désolés que vous ayez abouti ici. Il arrive parfois qu'une page ait été déplacée ou supprimée. Heureusement, nous pouvons vous aider à trouver ce que vous cherchez. Que faire?"
            }
          </p>
          <ul>
            <li>
              Retournez à la{' '}
              <Link href="/" locale="default">
                <a className="text-cyan-600 underline">page {"d'accueil;"}</a>
              </Link>
            </li>
            <li>
              <Link href="https://www.canada.ca/en/contact.html">
                <a className="text-cyan-600 underline">Communiquez avec nous</a>
              </Link>
              {" pour obtenir de l'aide."}
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Custom404
