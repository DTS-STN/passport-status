import Link from 'next/link'

export interface ApplicationNameBarProps {
  text: string
  href: string
}

const ApplicationNameBar = ({ text, href }: ApplicationNameBarProps) => {
  return (
    <div id="app-bar" className="bg-blue-dark">
      <section className="container mx-auto p-4">
        <Link
          href={href}
          className="font-body md:text-[28px] text-lg font-bold text-white hover:underline"
        >
          {text}
        </Link>
      </section>
    </div>
  )
}

export default ApplicationNameBar
