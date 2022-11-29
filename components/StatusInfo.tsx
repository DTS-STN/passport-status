import { FC, MouseEventHandler } from 'react'
import ActionButton from './ActionButton'

export interface StatusInfoProps {
  id: string
  onGoBackClick: MouseEventHandler<HTMLButtonElement>
  goBackText: string
  goBackStyle?: 'default' | 'primary' | 'super' | 'danger'
  checkAgainText: string
  children: JSX.Element
}

export const StatusInfo: FC<StatusInfoProps> = ({
  checkAgainText,
  children,
  goBackText,
  id,
  onGoBackClick,
  goBackStyle,
}) => {
  return (
    <div id={id}>
      {children}
      <p className="mb-6">{checkAgainText}</p>
      <ActionButton
        onClick={onGoBackClick}
        text={goBackText}
        style={goBackStyle}
      />
    </div>
  )
}

export default StatusInfo
