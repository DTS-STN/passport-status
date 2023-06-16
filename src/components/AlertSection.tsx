import { FC, PropsWithChildren } from 'react'

import { AlertType } from '../lib/types'

export interface AlertSectionProps {
  type: AlertType
  className?: string
}

const borderColors = {
  danger: 'border-accent-error',
  warning: 'border-accent-warning',
  success: 'border-accent-success',
  info: 'border-accent-info',
}

const svgStyles = {
  danger: '-translate-x-3 translate-y-10',
  warning: '-translate-x-3 translate-y-10',
  success: '-translate-x-3 translate-y-10',
  info: '-translate-x-3 translate-y-10',
}

const svg = (type: AlertType) => {
  switch (type) {
    case 'danger': {
      return (
        <svg
          className="bg-white p-1 fill-accent-error w-8 h-8"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50,5C25.1,5,5,25.1,5,50c0,24.9,20.1,45,45,45c24.9,0,45-20.1,45-45C95,25.1,74.9,5,50,5L50,5z M55.6,77  c0,3.2-2.5,5.6-5.6,5.6c-3.1,0-5.5-2.5-5.5-5.6v-1.1c0-3.1,2.5-5.6,5.5-5.6c3.1,0,5.6,2.5,5.6,5.6V77z M58.3,26.3l-2.8,34.2  c-0.3,3.2-3,5.4-6.1,5.2c-2.8-0.2-4.9-2.5-5.1-5.2l-2.8-34.2c-0.5-4.5,3.7-8.9,8.2-8.9C54.7,17.4,58.7,21.8,58.3,26.3z"></path>
        </svg>
      )
    }
    case 'success': {
      return (
        <svg
          className="bg-white p-1 fill-accent-success w-8 h-8"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m504 256c0 136.967-111.033 248-248 248s-248-111.033-248-248 111.033-248 248-248 248 111.033 248 248zm-276.686 131.314 184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0l-150.059 150.058-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
        </svg>
      )
    }
    case 'warning': {
      return (
        <svg
          className="bg-white p-1 fill-accent-warning w-8 h-8"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 5.511c.561 0 1.119.354 1.544 1.062l5.912 9.854c.851 1.415.194 2.573-1.456 2.573h-12c-1.65 0-2.307-1.159-1.456-2.573l5.912-9.854c.425-.708.983-1.062 1.544-1.062m0-2c-1.296 0-2.482.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83s1.879 1.772 3.406 1.772h12c1.527 0 2.77-.646 3.406-1.771s.551-2.521-.235-3.83l-5.912-9.854c-.777-1.294-1.963-2.034-3.259-2.034z" />
          <circle cx="12" cy="16" r="1.3" />
          <path d="M13.5 10c0-.83-.671-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .199.041.389.111.562.554 1.376 1.389 3.438 1.389 3.438l1.391-3.438c.068-.173.109-.363.109-.562z" />
        </svg>
      )
    }
    case 'info': {
      return (
        <svg
          className="bg-white p-1 fill-accent-info w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      )
    }
  }
}

const AlertSection: FC<PropsWithChildren<AlertSectionProps>> = ({
  children,
  type,
  className,
}) => {
  const borderColor = borderColors[type]

  return (
    <div className={className}>
      <div className={`${svgStyles[type]} -mt-8`}>{svg(type)}</div>
      <section className={`pb-0.5 pt-2 border-l-8 ${borderColor}`}>
        <div className="ml-4">{children}</div>
      </section>
    </div>
  )
}

export default AlertSection
