import { FC } from 'react'

export interface CollapseProps {
  title: string
  children?: JSX.Element
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  return (
    <details className="max-w-prose border p-3 mb-3 rounded">
      <summary className="text-blue-light hover:underline cursor-pointer focus:text-link-selected hover:text-link-selected">
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
