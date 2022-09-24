import { FC, MouseEventHandler } from 'react'

export interface ActionButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: 'default' | 'primary' | 'super' | 'danger'
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const ActionButton: FC<ActionButtonProps> = ({
  onClick,
  style,
  text,
  type,
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

  return (
    <button className={classStyle} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

ActionButton.defaultProps = {
  type: 'button',
  style: 'default',
}

export default ActionButton
