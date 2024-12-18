import { useId } from 'react'

const variants = {
  fitWidth: 'w-fit',
  fullWidth: 'w-full',
  halfWidth: 'w-6/12',
  slim: 'max-w-prose text-base',
  default: 'max-w-prose',
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
      className={`mb-3 rounded border p-3 ${variants[variant]}`}
    >
      <summary
        id={`${id}-details-summary`}
        className={
          'cursor-pointer text-blue-light hover:text-link-selected hover:underline focus:text-link-selected focus:underline'
        }
      >
        {title}
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  )
}

export default Collapse
