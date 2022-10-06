import { FC, MouseEventHandler } from 'react'

export interface ActionButtonProps {
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: 'default' | 'primary' | 'super' | 'danger'
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  onClick,
  style,
  text,
  type,
}) => {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white '
  switch (style) {
    case 'primary':
      classStyle +=
        'border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-[#16446c]'
      break
    default:
      classStyle +=
        'border-gray-default bg-gray-light text-blue-light hover:border-gray-deep hover:bg-gray-dark'
      break
  }

  return (
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
