export interface InputErrorMessageProps {
  id?: string
  message: string
}

const InputErrorMessage = ({ id, message }: InputErrorMessageProps) => {
  return (
    <div
      id={id}
      data-testid="input-error-message"
      className="border-red-dark bg-red-light mb-1.5 inline-block border-l-4 px-2 font-bold"
    >
      {message}
    </div>
  )
}

export default InputErrorMessage
