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
      className={`mb-3 rounded-sm border p-3 ${variants[variant]}`}
    >
      <summary
        id={`${id}-details-summary`}
        className={
          'text-blue-light hover:text-link-selected focus:text-link-selected cursor-pointer hover:underline focus:underline'
        }
      >
        {title}
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  )
}

export default Collapse
