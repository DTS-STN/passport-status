import Link from 'next/link'
import { FC, MouseEventHandler } from 'react'

export interface ActionButtonProps {
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: 'default' | 'primary' | 'super' | 'danger'
  text: string
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  onClick,
  style,
  text,
  type,
  href,
}) => {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2.5 px-3.5 focus:ring-2 focus:ring-offset-2 '
  switch (style) {
    case 'primary':
      classStyle +=
        'border-blue-deep bg-blue-dark text-basic-white hover:bg-blue-normal'
      break
    default:
      classStyle +=
        'border-gray-default bg-gray-light text-blue-light hover:border-gray-deep hover:bg-gray-dark'
      break
  }

  return href ? (
    <Link href={href}>
      <a className={classStyle}>{text}</a>
    </Link>
  ) : (
    <button
      className={classStyle}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

ActionButton.defaultProps = {
  type: 'button',
  style: 'default',
}

export default ActionButton
