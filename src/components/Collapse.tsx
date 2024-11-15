import { useId } from 'react'

const variants = {
  slim: 'text-base',
  default: 'rounded border',
}
export interface CollapseProps {
  title: string
  children?: React.ReactNode
  variant?: keyof typeof variants
}

const Collapse = ({ title, children, variant = 'default' }: CollapseProps) => {
  const id = useId()
  return (
    <details
      aria-describedby={`${id}-details-summary`}
      className={`mb-3 max-w-prose p-3 ${variants[variant]}`}
    >
      <summary
        id={`${id}-details-summary`}
        className={
          'cursor-pointer text-blue-light hover:text-link-selected hover:underline focus:text-link-selected focus:underline '
        }
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
