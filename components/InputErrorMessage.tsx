import { FC } from 'react'

export interface InputErrorMessageProps {
  id?: string
  message: string
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ id, message }) => {
  return (
    <div
      id={id}
      data-testid="input-error-message"
      className="font-bold border-l-4 border-red-dark mb-1.5 px-2 bg-red-light inline-block"
    >
      {message}
    </div>
  )
}

export default InputErrorMessage
