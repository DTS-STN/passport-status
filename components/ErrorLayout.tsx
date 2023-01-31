import { FC } from 'react'

export interface ErrorLayoutProps {
  children?: React.ReactNode
}

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto my-6 px-4">
        <img
          className="h-6 w-auto sm:h-8 md:h-8 lg:h-7 xl:h-8"
          src={'/sig-blk-en.svg'}
          alt="Government of Canada - Gouvernement du Canada"
        />
      </header>
      <hr />
      <main
        role="main"
        id="mainContent"
        className="container mx-auto my-8 flex-1 px-4"
      >
        {children}
      </main>
      <footer className="bg-gray-light py-4">
        <div className="container mx-auto flex justify-between px-4 lg:flex-row-reverse">
          <a className="w-32 font-body text-sm sm:w-36 lg:hidden" href="#">
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
