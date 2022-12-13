import { FC } from 'react'

export interface CollapseProps {
  id: string
  title: string
  children?: React.ReactNode
}

const Collapse: FC<CollapseProps> = ({ id, title, children }) => {
  return (
    <details
      aria-describedby={id}
      className="max-w-prose border p-3 mb-3 rounded"
    >
      <summary
        id={id}
        className="text-blue-light hover:underline cursor-pointer focus:text-link-selected focus:underline hover:text-link-selected"
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
