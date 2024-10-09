import { useId } from 'react'

export interface CollapseProps {
  title: string
  children?: React.ReactNode
  detailProps?: string
  summaryProps?: string
}

const Collapse = ({
  title,
  children,
  detailProps,
  summaryProps,
}: CollapseProps) => {
  const id = useId()
  return (
    <details
      aria-describedby={`${id}-details-summary`}
      className={'mb-3 max-w-prose p-3 ' + detailProps}
    >
      <summary
        id={`${id}-details-summary`}
        className={
          'cursor-pointer text-blue-light hover:text-link-selected focus:text-link-selected ' +
          summaryProps
        }
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
