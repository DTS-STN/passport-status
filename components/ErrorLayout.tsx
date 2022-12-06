import { FC } from 'react'

export interface ErrorLayoutProps {
  children?: React.ReactNode
}

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 my-6">
        <img
          className="h-5 w-auto xs:h-6 sm:h-8 md:h-8 lg:h-7 xl:h-8"
          src={'/sig-blk-en.svg'}
          alt="Government of Canada - Gouvernement du Canada"
        />
      </header>
      <hr />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto px-4 my-8 flex-1"
      >
        {children}
      </main>
      <footer className="py-4 bg-gray-light">
        <div className="container mx-auto px-4 flex lg:flex-row-reverse justify-between">
          <a className="w-32 sm:w-36 lg:hidden text-sm font-body" href="#">
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
        </div>
      </footer>
    </div>
  )
}

export default ErrorLayout
