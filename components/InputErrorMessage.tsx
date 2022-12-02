import { FC } from 'react'

export interface InputErrorMessageProps {
  message: string
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ message }) => {
  return (
    <div className="font-bold border-l-4 border-red-dark mb-1.5 px-2 bg-red-light inline-block">
      {message}
    </div>
  )
}

export default InputErrorMessage
