import { FC } from 'react'

export interface ErrorLayoutProps {
  children?: React.ReactNode
}

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <img
        className="h-5 w-auto xs:h-6 sm:h-8 md:h-8 lg:h-7 xl:h-8 my-5 mx-4 lg:mx-6"
        src={'/sig-blk-en.svg'}
        alt="Government of Canada - Gouvernement du Canada"
      />

      <main
        role="main"
        className="grid grid-cols-1 lg:grid-cols-2 mx-4 lg:mx-6 gap-4 lg:gap-8"
      >
        {children}
      </main>

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

export default ErrorLayout
