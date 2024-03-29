import { useId } from 'react'

export interface CollapseProps {
  title: string
  children?: React.ReactNode
}

const Collapse = ({ title, children }: CollapseProps) => {
  const id = useId()
  return (
    <details
      aria-describedby={`${id}-details-summary`}
      className="mb-3 max-w-prose rounded border p-3"
    >
      <summary
        id={`${id}-details-summary`}
        className="cursor-pointer text-blue-light hover:text-link-selected hover:underline focus:text-link-selected focus:underline"
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
