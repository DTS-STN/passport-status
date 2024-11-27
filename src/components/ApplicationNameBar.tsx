import Link from 'next/link'

export interface ApplicationNameBarProps {
  text: string
  href: string
}

const ApplicationNameBar = ({ text, href }: ApplicationNameBarProps) => {
  return (
    <div id="app-bar" className="bg-blue-dark">
      <section className="container mx-auto p-4">
        <h2>
          <Link
            href={href}
            className="font-body text-lg font-bold text-white underline md:text-[28px]"
          >
            {text}
          </Link>
        </h2>
      </section>
    </div>
  )
}

export default ApplicationNameBar
