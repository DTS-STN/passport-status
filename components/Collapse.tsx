import { FC, useId } from 'react'

export interface CollapseProps {
  title: string
  children?: React.ReactNode
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const id = useId()
  return (
    <details
      aria-describedby={`${id}-details-summary`}
      className="max-w-prose border p-3 mb-3 rounded"
    >
      <summary
        id={`${id}-details-summary`}
        className="text-blue-light hover:underline cursor-pointer focus:text-link-selected focus:underline hover:text-link-selected"
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
