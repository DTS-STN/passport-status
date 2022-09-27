import { FC } from 'react'

export interface InputLabelProps {
  id: string
  label: string
  required?: boolean
  textRequired?: string
}

const InputLabel: FC<InputLabelProps> = ({
  id,
  label,
  required,
  textRequired,
}) => {
  return (
    <label
      htmlFor={id}
      className={`font-bold block mb-1.5 ${required ? 'required' : ''}`}
    >
      {label}
      {required && (
        <strong className="text-accent-error">&nbsp;{textRequired}</strong>
      )}
    </label>
  )
}

export default InputLabel
