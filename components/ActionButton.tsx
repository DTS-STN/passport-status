import { FC, MouseEventHandler } from 'react'
import { GetButtonStyle } from './common-styles'

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
  return (
    <button
      className={GetButtonStyle(style)}
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
