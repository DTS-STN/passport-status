import { FC, MouseEventHandler } from 'react'

export interface ActionButtonProps {
  disabled?: boolean
  id?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: 'default' | 'primary' | 'super' | 'danger'
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  id,
  onClick,
  style,
  text,
  type,
}) => {
  let classStyle =
    'inline-block text-center align-middle rounded border py-2 px-10 focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none '
  switch (style) {
    case 'primary':
      classStyle +=
        'border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active'
      break
    default:
      classStyle +=
        'border-gray-dark bg-gray-normal text-blue-light hover:bg-gray-dark hover:border-l-gray-deep hover:border-t-gray-deep focus:text-blue-light focus:bg-gray-dark border-r-gray-500 border-b-gray-500'
      break
  }

  return (
    <button
      id={id}
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
