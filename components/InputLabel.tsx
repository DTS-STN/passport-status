import { FC } from 'react'

export interface InputLabelProps {
  htmlFor: string
  id: string
  label: string
  required?: boolean
  textRequired?: string
}

const InputLabel: FC<InputLabelProps> = ({
  htmlFor,
  id,
  label,
  required,
  textRequired,
}) => {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={`font-bold block mb-2 ${required ? 'required' : ''}`}
    >
      {label}
      {required && (
        <strong className="text-accent-error">&nbsp;{textRequired}</strong>
      )}
    </label>
  )
}

export default InputLabel