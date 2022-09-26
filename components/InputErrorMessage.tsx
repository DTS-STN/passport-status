import { FC } from 'react'

export interface InputErrorMessageProps {
  message: string
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ message }) => {
  return (
    <span className="font-bold border-l-4 border-red-dark mb-1 px-2 bg-red-light inline-block">
      {message}
    </span>
  )
}

export default InputErrorMessage
