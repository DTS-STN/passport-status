import { MouseEventHandler } from 'react'
import ActionButton from './ActionButton'

export interface StatusInfoProps {
  handleGoBackClick: MouseEventHandler<HTMLButtonElement>
  goBackText: string
  goBackStyle?: 'default' | 'primary' | 'super' | 'danger'
  checkAgainText: string
  children: JSX.Element
}

export default function StatusInfo(props: StatusInfoProps) {
  return (
    <div id="response">
      {props.children}
      <p className="mb-6">{props.checkAgainText}</p>
      <ActionButton
        onClick={props.handleGoBackClick}
        text={props.goBackText}
        style={props.goBackStyle}
      />
    </div>
  )
}
